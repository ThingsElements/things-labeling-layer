import LabelResizer from './label-resizer'
import LabelRotator from './label-rotator'

export default class LabelingLayer extends scene.ModelingLayer {

  constructor(model, context) {
    super(model, context)

    var rotator = new LabelRotator(this);
    var resizer = new LabelResizer(this);

    this.reversedModelers.splice(0, 1, rotator);
    this.reversedModelers.splice(1, 1, resizer);
    this.modelers.splice(2, 1, resizer);
    this.modelers.splice(3, 1, rotator);
  }

	_draw(context) {

    context.beginPath();

    var scale = this.get('scale') || {x:1, y:1}

    var selected = this.selected.filter(c => {
      /*
       * 부모가 있는 컴포넌트만을 그린다.
       * (selected에는 남아있을 수 있으나, undo에 의해서 이미 제거된 것일 수 있다.)
       */
      return !!c.parent
    })

    if(this.focused) {
      this._componentDrawer(context, this.focused, scale,
        (context, component, scale) => {
          this.focusOutline.draw(context, component, scale)
        }
      )
    }

    /* TODO selected의 부모가 group인 경우에 최상위 그룹의 모델링 레이아웃을 그려주어야 한다. */
    if(selected.length > 0 && selected[0].parent.isGroup()) {
      let rootGroup = selected[0].parent
      while(rootGroup.parent.isGroup())
        rootGroup = rootGroup.parent

      this._componentDrawer(context, rootGroup, scale,
        (context, component, scale) => {
          this.groupOutline.draw(context, component, scale)
        }
      )
    }

    selected.forEach(component => {

      this._componentDrawer(context, component, scale,
        (context, component, scale) => {
          this.reversedModelers.forEach((modeler, idx) => {
            modeler.draw(context, component, scale)
          })
        }
      )
    });
  }
}

scene.Component.register('labeling-layer', LabelingLayer)
