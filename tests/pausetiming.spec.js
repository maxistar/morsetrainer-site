import PauseTiming from "../src/pausetiming";

describe("pause timing", () => {
    beforeEach(() => {
        document.body.innerHTML =
    `<div id="beeptimer">
      <div class="timer-bar--time">
      </div>
      <div class="timer-bar--char">  
      </div>
      <div class="timer-bar--space">  
      </div>
    </div>`;
    });

    it("should be initialised", () => {
        new PauseTiming("#beeptimer", 1000, 3500);
        expect(document.querySelector('.timer-bar--time').style.width).toEqual('0%');
        expect(document.querySelector('.timer-bar--char').style.width).toEqual('29%');
    })

})
