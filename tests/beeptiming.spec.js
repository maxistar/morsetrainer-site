import BeepTiming from "../src/beeptiming";

describe("morse timer", () => {
    beforeEach(() => {
        document.body.innerHTML =
    `<div id="beeptimer">
      <div class="timer-bar--time">
      </div>
      <div class="timer-bar--delete">  
      </div>
      <div class="timer-bar--dash">  
      </div>
      <div class="timer-bar--dot">  
      </div>
    </div>`;
    });

    it("should be initialised", () => {
        new BeepTiming("#beeptimer", 500, 1500, 2500, 3500);
        expect(document.querySelector('.timer-bar--time').style.width).toEqual('0%');
        expect(document.querySelector('.timer-bar--delete').style.width).toEqual('71%');
        expect(document.querySelector('.timer-bar--dash').style.width).toEqual('43%');
        expect(document.querySelector('.timer-bar--dot').style.width).toEqual('14%');
    })
})

