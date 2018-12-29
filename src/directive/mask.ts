import { VNodeDirective, VNode } from 'vue/types/vnode'

interface BindValue {
  callback?: () => VNode | void
  model?: any
}

interface MaskVNodeDirective extends VNodeDirective {
  value: BindValue
  options?: boolean | AddEventListenerOptions
}

interface MaskVNodePosition {
  width: number
  height: number
  top: number
  left: number
  target: HTMLElement
  mask: HTMLElement
  count: number
}
let count = 0
let initBaseMask = false
let basemask: HTMLElement | null
let maskMap: MaskVNodePosition[] = []
function updateMaskStyle(event: Event | null, el: HTMLElement) {}

function insertLastMask() {
  const lastMask = maskMap[count - 1]
  let baseTop = 0
  if (lastMask) {
    baseTop = lastMask.height + lastMask.top + 2
  }
  const viewHeight = window.innerHeight
  if (initBaseMask) {
    basemask = document.getElementById('lastMask')
  } else {
    basemask = document.createElement('div')
    basemask.id = 'lastMask'
    basemask.classList.add('cover')
    document.body.appendChild(basemask)
    initBaseMask = true
  }
  if (basemask && lastMask) {
    basemask.style.top = lastMask.target.offsetTop + lastMask.height + 2 + 'px'
    basemask.style.display = 'block'
    basemask.style.height = 'calc(100vh - ' + basemask.style.top + ')'
    basemask.style.width = window.innerWidth + 'px'
    basemask.style.background = '#000'
    basemask.style.opacity = '0.75'
  }
}

function createMask(el: HTMLElement, binding: MaskVNodeDirective) {
  const mask = document.createElement('div')
  if (binding.value && binding.value.callback) {
    mask.addEventListener('click', binding.value.callback)
  }
  mask.setAttribute('data', '' + count)
  const lastMask = maskMap[count - 1]
  let baseTop = 0
  if (lastMask) {
    baseTop = lastMask.target.offsetTop + lastMask.height + 2
  }
  const left = el.offsetLeft
  const top = el.offsetTop - baseTop
  const width = el.offsetWidth
  const height = el.offsetHeight
  const viewWidth = window.innerWidth
  mask.style.width = width + 'px'
  mask.style.height = height + 'px'
  mask.style.top = baseTop + 'px'
  const target = {
    width,
    height,
    left,
    top,
    target: el,
    mask,
    count
  }
  maskMap.push(target)
  count++
  mask.style.borderWidth = `${top}px ${viewWidth - left - width}px ${0} ${left}px`
  mask.classList.add('cover')

  if (el.parentElement) {
    el.parentElement.insertBefore(mask, el)
  }
  insertLastMask()
  return target
}

function inserted(el: HTMLElement, binding: MaskVNodeDirective) {
  //   const mask = document.createElement('div')
  //   if (binding.value && binding.value.callback) {
  //     mask.addEventListener('click', binding.value.callback)
  //   }
  //   mask.setAttribute('data', '' + count)
  //   const lastMask = maskMap[count - 1]
  //   let baseTop = 0
  //   if (lastMask) {
  //     baseTop = lastMask.target.offsetTop + lastMask.height + 2
  //   }
  //   const left = el.offsetLeft
  //   const top = el.offsetTop - baseTop
  //   const width = el.offsetWidth
  //   const height = el.offsetHeight
  //   const viewWidth = window.innerWidth
  //   mask.style.width = width + 'px'
  //   mask.style.height = height + 'px'
  //   mask.style.top = baseTop + 'px'
  //   maskMap.push({
  //     width,
  //     height,
  //     left,
  //     top,
  //     target: el,
  //     mask,
  //     count
  //   })
  //   count++
  //   mask.style.borderWidth = `${top}px ${viewWidth - left - width}px ${0} ${left}px`
  //   mask.classList.add('cover')
  //   if (el.parentElement) {
  //     el.parentElement.insertBefore(mask, el)
  //   }
  //   insertLastMask()
}

function unbind(el: HTMLElement, binding: VNodeDirective) {
  //   window.removeEventListener('resize', updateMaskStyle(event, el))
  if (binding.value && binding.value.callback) {
    const target = maskMap.find(mask => mask.target === el)
    if (target) {
      target.mask.removeEventListener('click', binding.value.callback)
    }
  }
  maskMap = []
  count = 0
}

function update(el: HTMLElement, binding: VNodeDirective) {
  if (binding.value) {
    let target = maskMap.find(mask => mask.target === el)
    if (!target) {
      target = createMask(el, binding)
    }
    target.mask.style.display = binding.value.model ? 'block' : 'none'
    if (basemask) {
      basemask.style.display = binding.value.model ? 'block' : 'none'
    }
  }
}

function bind(el: HTMLElement, binding: VNodeDirective) {
  //   window.addEventListener('resize', updateMaskStyle)
}
export default { bind, inserted, unbind, update }
