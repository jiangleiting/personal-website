// 获取当前语言
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'zh-CN';
}

// 设置语言
async function setLanguage(lang) {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem('language', lang);
            updateContent();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

// 更新页面内容
function updateContent() {
    const currentLang = getCurrentLanguage();
    const trans = translations[currentLang];

    // 添加过渡动画类
    document.body.classList.add('language-transitioning');

    // 更新导航菜单
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = trans;
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                console.warn(`Translation missing for key: ${key}`);
                value = null;
                break;
            }
        }
        
        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                // 添加淡出动画
                element.style.opacity = '0';
                element.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    element.textContent = value;
                    // 添加淡入动画
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 150);
            }
        }
    });

    // 更新HTML语言属性
    document.documentElement.lang = currentLang;

    // 更新结构化数据
    updateStructuredData(currentLang);

    // 移除过渡动画类
    setTimeout(() => {
        document.body.classList.remove('language-transitioning');
    }, 300);

    // 触发自定义事件
    document.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: currentLang }
    }));
}

// 更新结构化数据
function updateStructuredData(lang) {
    const structuredData = document.querySelector('script[type="application/ld+json"]');
    if (structuredData) {
        const data = JSON.parse(structuredData.textContent);
        data.inLanguage = lang;
        data.name = translations[lang].nav.title;
        data.description = translations[lang].sections.aiTools.description;
        structuredData.textContent = JSON.stringify(data, null, 2);
    }
}

// 初始化语言切换器
function initLanguageSwitcher() {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        // 设置当前语言
        languageSelect.value = getCurrentLanguage();
        
        // 添加过渡动画样式
        const style = document.createElement('style');
        style.textContent = `
            [data-i18n] {
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            .language-transitioning [data-i18n] {
                transition: opacity 0.15s ease, transform 0.15s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    updateContent();
}); 