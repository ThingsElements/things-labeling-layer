const ROTATION_STEP = Math.PI/2;

export default class LabelRotator extends scene.RotatorModeler {
	ondragmove(e) {

    /* 로테이트 핸들의 이동을 처리한다. */
    var { component } = this.active

    // 회전을 시키려는 대상 컴포넌트의 중심점과 이벤트 포인트와의 각도가 중요하므로,
    // 컴포넌트 스케일과 회전이 감안되지 않은 부모의 좌표로 변환하여 계산한다.

    var point = component.transcoordC2S(e.offsetX, e.offsetY)
    point = component.transcoordS2P(point.x, point.y)

    var rotatePoint = component.rotatePoint

    var oldTheta = component.get('rotation') || 0
    var newTheta = Math.atan((rotatePoint.y - point.y) / (rotatePoint.x - point.x));
    newTheta = rotatePoint.x >= point.x ? newTheta - Math.PI * 0.5 : Math.PI * 0.5 + newTheta
    newTheta = (Math.floor(newTheta / ROTATION_STEP)) * ROTATION_STEP

    var deltaTheta = newTheta - oldTheta

    this.layer.selected.filter(c => {
      return c.rotatable
    }).forEach((c, i) => {
      /* 최초의 바운드로 되돌려놓고 다시 계산한다. */
      let rotation = c.get('rotation')
      c.set('rotation', (rotation + deltaTheta) % (Math.PI * 2))
    })
  }
}