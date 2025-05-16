// 获取当前语言
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'zh-CN';
}

// 设置语言
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    updateContent();
}

// 更新页面内容
function updateContent() {
    const currentLang = getCurrentLanguage();
    const trans = translations[currentLang];

    // 更新导航菜单
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = trans;
        
        for (const k of keys) {
            value = value[k];
        }
        
        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        }
    });

    // 更新HTML语言属性
    document.documentElement.lang = currentLang;

    // 触发自定义事件
    document.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: currentLang }
    }));
}

// 初始化语言切换器
function initLanguageSwitcher() {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = getCurrentLanguage();
        languageSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    updateContent();
}); 