// ==UserScript==
// @name                  Twitter AD Filter | 推特广告过滤
// @name:vi               Bộ lọc quảng cáo Twitter
// @name:zh-CN            推特广告过滤器
// @name:zh-TW            推特廣告過濾器
// @name:ja               Twitter広告フィルター
// @name:ko               트위터 광고 필터
// @name:es               Filtro de anuncios de Twitter
// @name:ru               Фильтр рекламы Twitter
// @name:id               Filter Iklan Twitter
// @name:hi               ट्विटर विज्ञापन फ़िल्टर
// @namespace             http://tampermonkey.net/
// @version               0.2
// @description           Hide ads in tweets and sidebar. Optimized performance.
// @description:vi        Ẩn quảng cáo trong tweet và thanh bên. Hiệu suất được tối ưu hóa.
// @description:zh-CN     隐藏推特中的广告和侧边栏广告。性能优化。
// @description:zh-TW     隱藏推特中的廣告和側邊欄廣告。性能優化。
// @description:ja        ツイートとサイドバーの広告を非表示にします。パフォーマンス最適化。
// @description:ko        트윗과 사이드바의 광고를 숨깁니다. 성능 최적화.
// @description:es        Oculta anuncios en tweets y barra lateral. Rendimiento optimizado.
// @description:ru        Скрывает рекламу в твитах и боковой панели. Оптимизированная производительность.
// @description:id        Sembunyikan iklan di tweet dan bilah samping. Kinerja dioptimalkan.
// @description:hi        ट्वीट्स और साइडबार में विज्ञापनों को छिपाएं। अनुकूलित प्रदर्शन।
// @icon                  https://about.twitter.com/etc/designs/about2-twitter/public/img/favicon-32x32.png
// @author                gabe
// @license               MIT
// @match                 https://twitter.com/*
// @match                 https://x.com/*
// @grant                 none
// ==/UserScript==

(function () {
    "use strict";
    
    let adCount = 0;
    
    function log() {
        return console.info("[Twitter AD Filter]", ...arguments);
    }
    
    function hideAd(node) {
        try {
            if (
                !node ||
                node.nodeName !== "DIV" ||
                node.getAttribute("data-testid") !== "cellInnerDiv"
            ) {
                return;
            }
            
            const adArticle = node.querySelector(
                "div[data-testid='placementTracking'] > article"
            );
            if (!adArticle) {
                return;
            }
            
            const userName = adArticle.querySelector("div[data-testid='User-Name']");
            log("发现广告:", ++adCount, userName ? userName.innerText : "未知用户");
            
            node.style.cssText += "display: none;";
        } catch (err) {
            log("发生错误:", err.message);
        }
    }
    
    const pageObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(hideAd);
        });
        
        const sidebarAd = document.querySelector("#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-aqfbo4.r-10f7w94.r-1hycxz > div > div.css-175oi2r.r-1hycxz.r-gtdqiz > div > div > div > div:nth-child(3) > div > aside");
        if (sidebarAd) {
            sidebarAd.style.display = 'none';
            log("已隐藏右侧栏广告");
        }
    });
    
    pageObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
    
    document.querySelectorAll("div[data-testid='cellInnerDiv']").forEach(hideAd);
    
    log("--- 广告过滤器已启动 ---");
})();