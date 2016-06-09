const RESIZE_HANDLE_HALF_SIZE = 4
const RESIZE_HANDLE_FULL_SIZE = 8

export default class LabelResizer extends scene.ResizerModeler {
	contains(x, y, component, scale) {

    if(!component.resizable)
      return false

    // 좌표가 바운드 핸들에 포함되어있는지 확인함.
    getResizeHandles(component.bounds, component.model.type).every((handle, index) => {

      if(Math.abs(x - handle.x) <= (RESIZE_HANDLE_HALF_SIZE / scale.x) && Math.abs(y - handle.y) <= (RESIZE_HANDLE_HALF_SIZE / scale.y)) {
        // 현재 선택된 리사이즈 핸들의 정보
        
        this.active = { component, index }
      }

      // 찾았으면, 스톱한다.
      return !this.active
    })

    return !!this.active
  }

  draw(ctx, component, scale) {

    // Line 같은 경우는 그리지 않는다.
    if(!component.resizable && component.mutable)
      return

    // Bound 박스를 그린다.
    var bounds = component.bounds

    ctx.beginPath()
    ctx.rect(bounds.left, bounds.top, bounds.width, bounds.height)
    ctx.setLineDash([3 / scale.x, 4 / scale.y])
    ctx.lineWidth = 1 / scale.x
    ctx.strokeStyle = 'black'

    ctx.stroke()

    ctx.setLineDash([]) // reset lineDash

    if(!component.resizable)
      return

    // Bound 핸들(Resize Handle)을 그린다.
    var active = this.active

    getResizeHandles(bounds, component.model.type).forEach((point, index) => {
      ctx.beginPath()

      ctx.rect(
        point.x - (RESIZE_HANDLE_HALF_SIZE / scale.x),
        point.y - (RESIZE_HANDLE_HALF_SIZE / scale.y),
        RESIZE_HANDLE_FULL_SIZE / scale.x,
        RESIZE_HANDLE_FULL_SIZE / scale.y
      )
      ctx.setLineDash([0, 0])
      ctx.strokeStyle = '#656565'
      ctx.stroke()
      ctx.fillStyle = '#fff'

      if(active && active.component === component && active.index === index) {
        ctx.strokeStyle = '#fa7703'

        if (active.focus)
          ctx.fillStyle = '#ffb80c'
      }

      ctx.fill()
      ctx.stroke()
    })
  }
}

function getResizeHandles(bounds, type) {
  var { left, top, width, height } = bounds

  var centerx = left + width / 2
  var centery = top + height / 2
  var right = left + width
  var bottom = top + height

	return [
    { x: left, y: top },
    { x: centerx, y: top },
    { x: right, y: top },
    { x: right, y: centery },
    { x: right, y: bottom },
    { x: centerx, y: bottom },
    { x: left, y: bottom },
    { x: left, y: centery }
  ]
}