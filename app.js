const state = { cart: [], mouse: { x: 0, y: 0 } }
const canvas = document.getElementById('bg-canvas')
const ctx = canvas.getContext('2d')
let particles = []
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  initParticles()
}
function initParticles() {
  const count = Math.floor((canvas.width * canvas.height) / 35000)
  particles = []
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      a: 0.08 + Math.random() * 0.18
    })
  }
}
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const g = ctx.createRadialGradient(
    state.mouse.x, state.mouse.y, 0,
    state.mouse.x, state.mouse.y, 400
  )
  g.addColorStop(0, 'rgba(244,228,228,0.2)')
  g.addColorStop(0.5, 'rgba(228,240,237,0.08)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'rgba(90,86,82,0.12)'
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    const dx = (state.mouse.x - p.x) * 0.0008
    const dy = (state.mouse.y - p.y) * 0.0008
    p.vx += dx
    p.vy += dy
    p.x += p.vx
    p.y += p.vy
    p.vx *= 0.98
    p.vy *= 0.98
    if (p.x < -10) p.x = canvas.width + 10
    if (p.x > canvas.width + 10) p.x = -10
    if (p.y < -10) p.y = canvas.height + 10
    if (p.y > canvas.height + 10) p.y = -10
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fill()
  }
  requestAnimationFrame(drawParticles)
}
window.addEventListener('mousemove', e => {
  state.mouse.x = e.clientX
  state.mouse.y = e.clientY
})
window.addEventListener('resize', resizeCanvas)
resizeCanvas()
drawParticles()
const hero = document.getElementById('hero')
const heroBg = hero.querySelector('.hero-bg')
const heroImage = hero.querySelector('.hero-image')
function onScroll() {
  const y = window.scrollY || window.pageYOffset
  heroBg.style.transform = `translateY(${y * -0.04}px) scale(1.02)`
  heroImage.style.transform = `translateY(${y * -0.08}px) scale(1.03)`
}
document.addEventListener('scroll', onScroll, { passive: true })
onScroll()
// Şəkillər — e-ticarət üçün uyumlu üslub (Ağ/boz fon, eyni ölçü 600x720)
const IMG = (id) => `https://images.unsplash.com/photo-${id}?w=600&h=720&fit=crop&q=85`
const products = [
  { id: 'm1', title: 'Kişi Klassik Gödəkçə', price: 89, category: 'men', brand: 'Ziya Essentials', sold: 2847, desc: 'Yüksək keyfiyyətli parça, klassik dizayn. Gündəlik və iş üçün ideal.', main: IMG('1594938298603-c8148c4dae35'), alt: IMG('1620799140408-edc6dcb6d633') },
  { id: 'm2', title: 'Yüngül Kişi Palto', price: 159, category: 'men', brand: 'Ziya Premium', sold: 1203, desc: 'İlk bahar üçün yüngül və modası keçməyən palto. İtalyan parçadan.', main: IMG('1591047139829-d91aecb6caea'), alt: IMG('1544022613-e87ca75a784a') },
  { id: 'm3', title: 'Oversize Sviter', price: 79, category: 'men', brand: 'Ziya Street', sold: 4521, desc: 'Rahat oversize kəsik, yumuşaq triko parça. Uniseks.', main: IMG('1620799140188-3b2a02fd9a77'), alt: IMG('1576566588028-4147f3842f27') },
  { id: 'm4', title: 'Parça Şalvar', price: 69, category: 'men', brand: 'Ziya Basics', sold: 3892, desc: 'Chino üslubunda smart-casual şalvar. Çox rəng seçimi.', main: IMG('1624378439583-faa8d0e768af'), alt: IMG('1594938298603-c8148c4dae35') },
  { id: 'w1', title: 'Parlaq Ətək', price: 119, category: 'women', brand: 'Ziya Woman', sold: 2156, desc: 'Parlaq parça, əsas kolleksiya. Xüsusi gecələr üçün.', main: IMG('1595777457583-95e059d581b8'), alt: IMG('1566174053879-31528523f8ae') },
  { id: 'w2', title: 'Kətan Bluzka', price: 64, category: 'women', brand: 'Ziya Nature', sold: 5234, desc: 'Təbii kətan parça, yaz-yay üçün. Nəfəs alan material.', main: IMG('1564257631407-4deb1f99d992'), alt: IMG('1558618666-fcd25c85cd64') },
  { id: 'w3', title: 'Qadın Üstün Palto', price: 199, category: 'women', brand: 'Ziya Premium', sold: 892, desc: 'İtalyan parçadan yüksək modelli palto. Çox illik istifadə.', main: IMG('1544022613-e87ca75a784a'), alt: IMG('1594938298603-c8148c4dae35') },
  { id: 'w4', title: 'Əlvan Köynək', price: 54, category: 'women', brand: 'Ziya Essentials', sold: 6781, desc: 'Yüngül parça, rəngli naxışlar. Gündəlik kombinasiya üçün.', main: IMG('1576566588028-4147f3842f27'), alt: IMG('1564257631407-4deb1f99d992') },
  { id: 'k1', title: 'Uşaq Sviter', price: 39, category: 'kids', brand: 'Ziya Kids', sold: 3124, desc: 'Uşaq dərisi üçün yumşaq triko. Hipoallergenik material.', main: IMG('1519457431-44ccd64a579b'), alt: IMG('1503919545889-aef636e10ad4') },
  { id: 'k2', title: 'Uşaq Köynək', price: 34, category: 'kids', brand: 'Ziya Kids', sold: 4567, desc: 'Rahat və davamlı. Tez quruyan parça.', main: IMG('1503919545889-aef636e10ad4'), alt: IMG('1519457431-44ccd64a579b') },
  { id: 'k3', title: 'Uşaq Palto', price: 79, category: 'kids', brand: 'Ziya Kids', sold: 1543, desc: 'Qış üçün isti və su keçirməyən. 2–8 yaş.', main: IMG('1519238263530-99bdd11df2ea'), alt: IMG('1522771930-78848d9293e8') },
  { id: 'a1', title: 'Dəri Qolbaq', price: 59, category: 'accessories', brand: 'Ziya Accessories', sold: 2890, desc: 'Əsl dəri, minimalist dizayn. Kişi və qadın üçün.', main: IMG('1523275335684-37898b6baf30'), alt: IMG('1584917865442-de89df76afd3') },
  { id: 'a2', title: 'Pələng Gözlük', price: 129, category: 'accessories', brand: 'Ziya Premium', sold: 967, desc: 'UV qoruma, hafif çərçivə. Klassik və müasir.', main: IMG('1572635196237-14b3f281503f'), alt: IMG('1511499767150-a48a237f0083') },
  { id: 'a3', title: 'Əl Çantası', price: 149, category: 'accessories', brand: 'Ziya Premium', sold: 1234, desc: 'Əsl dəri, laptop bölməli. İş və gündəlik üçün.', main: IMG('1584917865442-de89df76afd3'), alt: IMG('1548036328-c9fa89d128fa') },
  { id: 'a4', title: 'Şallı Dəsti', price: 44, category: 'accessories', brand: 'Ziya Basics', sold: 5432, desc: 'Yun və kaşmir qarışığı. Qış aksesuarı.', main: IMG('1520903920243-00d872a2d1c9'), alt: IMG('1576871337632-b9aef4c17ab9') }
]
function openProductModal(productId) {
  const p = products.find(x => x.id === productId)
  if (!p) return
  const body = document.getElementById('product-modal-body')
  if (!body) return
  const sold = p.sold ? p.sold.toLocaleString('az-AZ') : '0'
  body.innerHTML = `
    <div class="product-modal-grid">
      <div class="product-modal-media">
        <img src="${p.main}" alt="${p.title}">
      </div>
      <div class="product-modal-info">
        <span class="product-modal-brand">${p.brand || 'Ziya Brand'}</span>
        <h2 class="product-modal-title">${p.title}</h2>
        <p class="product-modal-sold">${sold} ədəd satılıb</p>
        <p class="product-modal-desc">${p.desc || ''}</p>
        <p class="product-modal-price">${p.price.toFixed(2)} ₼</p>
        <select class="product-modal-size">
          <option>Ölçü seçin</option>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
        <button class="btn primary product-modal-add" data-id="${p.id}">Səbətə əlavə et</button>
      </div>
    </div>
  `
  body.querySelector('.product-modal-add')?.addEventListener('click', (e) => {
    e.stopPropagation()
    addToCart(p.id)
    bumpCart()
  })
  document.getElementById('product-modal')?.classList.add('open')
  document.body.style.overflow = 'hidden'
}
function closeProductModal() {
  document.getElementById('product-modal')?.classList.remove('open')
  document.body.style.overflow = ''
}
function renderProducts() {
  const grids = document.querySelectorAll('.product-grid')
  grids.forEach(grid => {
    const cat = grid.getAttribute('data-category')
    const items = products.filter(p => p.category === cat)
    items.forEach((p, idx) => {
      const card = document.createElement('div')
      card.className = 'product-card reveal'
      card.style.animationDelay = `${idx * 60}ms`
      const media = document.createElement('div')
      media.className = 'product-media'
      const imgMain = document.createElement('img')
      imgMain.src = p.main
      imgMain.alt = p.title
      imgMain.className = 'main'
      const imgAlt = document.createElement('img')
      imgAlt.src = p.alt
      imgAlt.alt = p.title
      imgAlt.className = 'alt'
      media.appendChild(imgMain)
      media.appendChild(imgAlt)
      const quick = document.createElement('div')
      quick.className = 'quick-add'
      const size = document.createElement('select')
      size.innerHTML = '<option>Ölçü</option><option>S</option><option>M</option><option>L</option>'
      const add = document.createElement('button')
      add.className = 'btn primary'
      add.textContent = 'Səbətə at'
      add.addEventListener('click', (e) => { e.stopPropagation(); addToCart(p.id) })
      quick.appendChild(size)
      quick.appendChild(add)
      const info = document.createElement('div')
      info.className = 'product-info'
      const title = document.createElement('div')
      title.className = 'product-title'
      title.textContent = p.title
      const priceRow = document.createElement('div')
      priceRow.className = 'price-row'
      const price = document.createElement('div')
      price.className = 'price'
      price.textContent = p.price.toFixed(2) + ' ₼'
      const bag = document.createElement('button')
      bag.className = 'btn'
      bag.textContent = 'Səbət'
      bag.addEventListener('click', (e) => { e.stopPropagation(); addToCart(p.id) })
      priceRow.appendChild(price)
      priceRow.appendChild(bag)
      info.appendChild(title)
      info.appendChild(priceRow)
      card.addEventListener('click', () => openProductModal(p.id))
      quick.addEventListener('click', (e) => e.stopPropagation())
      info.querySelector('.price-row')?.addEventListener('click', (e) => e.stopPropagation())
      card.appendChild(media)
      card.appendChild(quick)
      card.appendChild(info)
      grid.appendChild(card)
    })
  })
}
renderProducts()
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('active'), i * 40)
      observer.unobserve(e.target)
    }
  })
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
function addToCart(productId) {
  const p = products.find(x => x.id === productId)
  if (!p) return
  const existing = state.cart.find(x => x.id === productId)
  if (existing) existing.qty += 1
  else state.cart.push({ ...p, qty: 1 })
  updateCartUI()
  bumpCart()
}
function updateCartUI() {
  const total = state.cart.reduce((a, i) => a + (i.qty || 1), 0)
  const sum = state.cart.reduce((a, i) => a + (i.price * (i.qty || 1)), 0)
  const c1 = document.getElementById('cart-count')
  const c2 = document.getElementById('floating-cart-count')
  if (c1) c1.textContent = String(total)
  if (c2) c2.textContent = String(total)
  const totalEl = document.querySelector('.cart-total strong')
  if (totalEl) totalEl.textContent = `${sum.toFixed(2)} ₼`
  const body = document.getElementById('cart-items')
  if (!body) return
  if (state.cart.length === 0) {
    body.innerHTML = '<p class="cart-empty" style="color:var(--muted);padding:1rem;">Səbət boşdur</p>'
    return
  }
  body.innerHTML = state.cart.map(i => `
    <div class="cart-item">
      <img class="cart-item-img" src="${i.main}" alt="${i.title}">
      <div class="cart-item-info">
        <h4>${i.title}</h4>
        <p>${i.qty || 1} × ${i.price.toFixed(2)} ₼</p>
      </div>
    </div>
  `).join('')
}
function toggleCart() {
  document.getElementById('cart-drawer')?.classList.toggle('open')
}
function bumpCart() {
  const btn = document.getElementById('floating-cart')
  if (btn) btn.animate([{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(-4px) scale(1.06)' }, { transform: 'translateY(0) scale(1)' }], { duration: 400, easing: 'ease-out' })
}
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI()
})
document.getElementById('floating-cart')?.addEventListener('click', () => { toggleCart() })
document.getElementById('header-cart-btn')?.addEventListener('click', () => { toggleCart() })
document.getElementById('cart-close')?.addEventListener('click', toggleCart)
document.getElementById('cart-backdrop')?.addEventListener('click', toggleCart)
document.getElementById('product-modal-close')?.addEventListener('click', closeProductModal)
document.getElementById('product-modal-backdrop')?.addEventListener('click', closeProductModal)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (document.getElementById('product-modal')?.classList.contains('open')) closeProductModal()
    else if (document.getElementById('cart-drawer')?.classList.contains('open')) toggleCart()
  }
})
window.addEventListener('scroll', () => {
  document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 20)
}, { passive: true })
