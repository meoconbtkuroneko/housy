import { Animation, PageTransition } from 'ionic-angular';

export class ModalScaleUpEnterTransition extends PageTransition {

    public init() {

        const ele = this.enteringView.pageRef().nativeElement;
        const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
        console.log("eleeleeleele", ele);
        ele.classList.add("full-container");
        ele.classList.add("extend");
        ele.classList.remove("collapse");

        wrapper.beforeStyles({ 'transform': 'scale(0)', 'opacity': 1 });
        wrapper.fromTo('transform', 'scale(0)', 'scale(1.0)');
        wrapper.fromTo('opacity', 0, 1);

        this
            .element(this.enteringView.pageRef())
            .duration(500)
            .easing('cubic-bezier(.1, .7, .1, 1)')
            .add(wrapper);
        // const width = this.plt.width();
        // const height = this.plt.height();
        // wrapper.beforeStyles({
        //     //   height: '100%',
        //     //   width: '100%',
        //     //   transition: `all 0.1s 0.35s,
        //     // height 0.2s $easer 0.1s,
        //     // width 0.2s $easer 0.15s,
        //     // border-radius 0.1s $easer 0.2s,
        //     // bottom 0.1s $easer 0.25s,
        //     // right 0.1s $easer 0.25s`,
        //     //   'border-radius': '50%',
        //     opacity: 1,
        // });

        // // wrapper.fromTo('height', '0', '100%');
        // // wrapper.fromTo('width', '0', '100%');
        // // wrapper.fromTo('top', '300px', '100px');

        // this
        //     .element(this.enteringView.pageRef())
        //     .duration(300)
        //     .add(wrapper);
    }
}


export class ModalScaleUpLeaveTransition extends PageTransition {

    public init() {
        const ele = this.leavingView.pageRef().nativeElement;
        const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
        const contentWrapper = new Animation(this.plt, ele.querySelector('.show-page'));

        wrapper.beforeStyles({ 'transform': 'scale(0)', 'opacity': 1 });
        wrapper.fromTo('transform', 'scale(1)', 'scale(0)');
        wrapper.fromTo('opacity', 1, 1);
        contentWrapper.fromTo('opacity', 1, 0);

        this
            .element(this.leavingView.pageRef())
            .duration(500)
            .easing('cubic-bezier(.1, .7, .1, 1)')
            .add(contentWrapper)
            .add(wrapper);
        // const width = this.plt.width();
        // const height = this.plt.height();
        // const ele = this.leavingView.pageRef().nativeElement;
        // ele.classList.remove("extend");
        // ele.classList.add("collapse");

        // const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
        // console.log("eleeleeleele", ele, wrapper);

        // // wrapper.fromTo('transform', 'translate3d(0,40px,0)', 'translate3d(' + width + 'px,' + height + 'px, 0)');
        // // wrapper.fromTo('opacity', 1, 1);
        // wrapper.beforeStyles({
        //     //   height: '100%',
        //     //   width: '100%',
        //     //   transition: `all 0.1s 0.35s,
        //     // height 0.2s $easer 0.1s,
        //     // width 0.2s $easer 0.15s,
        //     // border-radius 0.1s $easer 0.2s,
        //     // bottom 0.1s $easer 0.25s,
        //     // right 0.1s $easer 0.25s`,
        //     //   'border-radius': '50%',
        //     //   right: '10px',
        //     //   bottom: '10px',
        //     opacity: 1,
        // });



        // // wrapper.to('height', 0);
        // // wrapper.fromTo('width', '100%', '0');

        // this
        //     .element(this.leavingView.pageRef())
        //     .duration(400)
        // // .add(contentWrapper)
        // // .add(wrapper);
    }
}
