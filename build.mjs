import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {marked} from 'marked';

const root=path.dirname(fileURLToPath(import.meta.url));
const require=createRequire(import.meta.url);
const katex=require('katex');
const katexRoot=path.dirname(require.resolve('katex/package.json'));
const dist=path.join(root,'dist');
const detectedURL=new URL(process.env.SITE_URL || process.env.CF_PAGES_URL || 'http://localhost:8080');
const base=!process.env.SITE_URL && detectedURL.hostname.endsWith('.pages.dev')
  ? 'https://'+detectedURL.hostname.split('.').slice(-3).join('.')
  : detectedURL.origin;
const site='花青素的主页';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const write=(name,body)=>{const p=path.join(dist,name);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,body);};
const records=JSON.parse(fs.readFileSync(path.join(root,'articles.json'),'utf8'));
const slugs=new Set();
for(const a of records){
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug)||slugs.has(a.slug))throw Error('文章 slug 无效或重复：'+a.slug);
  if(!['articles','life'].includes(a.category))throw Error('category 应为 articles 或 life');
  slugs.add(a.slug);
}
fs.rmSync(dist,{recursive:true,force:true});
fs.mkdirSync(path.join(dist,'assets'),{recursive:true});
fs.copyFileSync(path.join(root,'portrait.jpg'),path.join(dist,'assets/portrait.jpg'));
write('robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
write('404.html',`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>页面未找到</title><link rel="stylesheet" href="/assets/site.css"></head><body><main class="page"><h1>页面未找到</h1><a href="/">返回主页</a></main></body></html>`);
fs.cpSync(path.join(katexRoot,'dist'),path.join(dist,'assets/katex'),{recursive:true});
fs.copyFileSync(path.join(katexRoot,'LICENSE'),path.join(dist,'assets/katex/LICENSE'));
fs.copyFileSync(path.join(root,'site.css'),path.join(dist,'assets/site.css'));

function document({title,description,url,body,math=false,data,home=false}){
 const prefix='/';
 return `<!doctype html>
<html lang="zh-CN"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
${home&&process.env.GOOGLE_SITE_VERIFICATION?`<meta name="google-site-verification" content="${escape(process.env.GOOGLE_SITE_VERIFICATION)}">`:''}
<meta name="color-scheme" content="light"><title>${escape(title)}</title>
<meta name="description" content="${escape(description)}"><meta name="robots" content="index, follow">
<link rel="canonical" href="${url}"><meta property="og:locale" content="zh_CN">
<meta property="og:site_name" content="${site}"><meta property="og:type" content="${math?'article':'website'}">
<meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}">
${math?`<link rel="stylesheet" href="${prefix}assets/katex/katex.min.css">`:''}
<link rel="stylesheet" href="${prefix}assets/site.css">
<script type="application/ld+json">${JSON.stringify(data).replace(/</g,'\\u003c')}</script>
${home?`<script>(function(){var r={'#articles':'/articles/','#turbulence-history':'/articles/turbulence-history/','#life':'/life/'};if(r[location.hash])location.replace(r[location.hash]);})();</script>`:''}
</head><body><div class="page ${math?'reading-layout':''}"><main>${body}</main>${math?'':'<footer>© 2026 花青素</footer>'}</div></body></html>`;
}
function meta(a){return `<div class="article-meta"><time datetime="${escape(a.date)}">${escape(a.date)}</time></div>`;}
function compile(md){
 const slots=[];
 const token=(tex,display)=>{
   let number='';
   if(display)tex=tex.replace(/\\tag\{([^{}]+)\}/,(_,n)=>{number=n;return '';});
   const rendered=katex.renderToString(tex.trim(),{displayMode:display,throwOnError:true,trust:false,output:'htmlAndMathml',strict:'warn'});
   const html=display?`<div class="equation"${number?` id="equation-${escape(number)}" data-number="${escape(number)}"`:''}><div class="equation-math" tabindex="0" aria-label="${number?'公式 '+escape(number):'公式'}">${rendered}</div>${number?`<span class="equation-number">(${escape(number)})</span>`:''}</div>`:`<span class="math-inline">${rendered}</span>`;
   const id='MATHPLACEHOLDER'+slots.length+'END';slots.push(html);return id;
 };
 // Protect code examples from math parsing, then parse math before Markdown.
 const code=[];
 md=md.replace(/```[\s\S]*?```|`[^`\n]+`/g,m=>{const id='CODEPLACEHOLDER'+code.length+'END';code.push(m);return id;});
 md=md.replace(/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]/g,(_,a,b)=>token(a??b,true));
 md=md.replace(/\\\((.+?)\\\)/gs,(_,tex)=>token(tex,false));
 md=md.replace(/(?<![\\$])\$(?!\$)([^$\n]+?)(?<!\\)\$(?!\$)/g,(_,tex)=>token(tex,false));
 md=md.replace(/CODEPLACEHOLDER(\d+)END/g,(_,i)=>code[Number(i)]);
 let html=marked.parse(md,{gfm:true,breaks:false});
 html=html.replace(/<p>(MATHPLACEHOLDER\d+END)<\/p>/g,'$1').replace(/MATHPLACEHOLDER(\d+)END/g,(_,i)=>slots[Number(i)]);
 html=html.replace(/<h([23])>(\d+(?:\.\d+)*)([^<]*)<\/h\1>/g,(_,n,id,rest)=>`<h${n} id="section-${id}">${id}${rest}</h${n}>`);
 html=html.replace(/<table>/g,'<div class="table-scroll" tabindex="0" aria-label="可横向滚动的表格"><table>').replace(/<\/table>/g,'</table></div>');
 html=html.replace(/<p>节点文献[：:]/g,'<p class="node-reference">节点文献：').replace(/<p>关键词[：:]/g,'<p class="keywords">关键词：');
 html=html.replace(/(<h2>参考文献<\/h2>\s*)<ol>/,'$1<ol class="reference-list">');
 return html;
}
for(const a of records){
 const md=fs.readFileSync(path.join(root,a.slug+'.md'),'utf8');
 let body=compile(md);
 if((body.match(/<h1[ >]/g)||[]).length!==1)throw Error('每篇文章必须有且仅有一个一级标题：'+a.slug);
 const url=`${base}/${a.category}/${a.slug}/`;
 write(`${a.category}/${a.slug}/index.html`,document({title:a.title+'｜'+site,description:a.description,url,math:true,body:`<article class="reading-page"><div class="article-body">${body}</div></article>`,data:{'@context':'https://schema.org','@type':'Article',headline:a.title,description:a.description,url,mainEntityOfPage:url,inLanguage:'zh-CN',datePublished:a.date,...(a.updated?{dateModified:a.updated}:{}),keywords:a.tags,isPartOf:{'@type':'WebSite',name:site,url:base+'/'}}}));
 console.log(a.slug+': '+(body.match(/class="equation"/g)||[]).length+' 个块公式，'+(body.match(/class="math-inline"/g)||[]).length+' 个行内公式');
}
for(const category of ['articles','life']){
 const title=category==='articles'?'文章':'生活分享';
 const entries=records.filter(a=>a.category===category).sort((a,b)=>b.date.localeCompare(a.date));
 const body=`<section class="article-page"><a class="back" href="/">返回主页</a><h1>${title}</h1>${entries.length?`<ul class="article-list">${entries.map(a=>`<li><a class="article-link" href="/${category}/${a.slug}/">${escape(a.title)}</a>${meta(a)}</li>`).join('')}</ul>`:'<p class="note">还没有发布生活分享。</p>'}</section>`;
 write(`${category}/index.html`,document({title:title+'｜'+site,description:category==='articles'?'花青素的文章目录，记录工程与阅读。':'花青素的生活分享。',url:base+'/'+category+'/',body,data:{'@context':'https://schema.org','@type':'CollectionPage',name:title,url:base+'/'+category+'/',inLanguage:'zh-CN'}}));
}
write('index.html',document({title:site+'｜崔川川',description:'崔川川的个人主页，记录商业航天结构设计、微通道流动沸腾、工程、阅读与生活。',url:base+'/',home:true,body:`<section id="home" aria-labelledby="home-title"><h1 id="home-title">${site}</h1><div class="profile-grid"><figure class="profile-photo"><img src="/assets/portrait.jpg" alt="崔川川在湖畔的照片" width="1707" height="1280" fetchpriority="high"></figure><div class="profile-copy"><h2>崔川川</h2><p>机械工程背景，从事商业航天结构设计。本科就读于北京化工大学，研究生就读于北京交通大学，研究方向为微通道流动沸腾与电子设备热管理。</p></div></div><p class="note">在这里记录工程、阅读与生活。</p><nav class="home-actions" aria-label="主页导航"><a class="button" href="/articles/">阅读文章</a><a class="button" href="/life/">生活分享</a></nav></section>`,data:{'@context':'https://schema.org','@type':'WebSite',name:site,alternateName:'花青素｜崔川川',url:base+'/',inLanguage:'zh-CN'}}));
write('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+['/','/articles/','/life/',...records.map(a=>`/${a.category}/${a.slug}/`)].map(url=>`  <url><loc>${base}${url}</loc></url>`).join('\n')+'\n</urlset>\n');
console.log('网站已生成到 dist，等待 Cloudflare 自动发布。');
