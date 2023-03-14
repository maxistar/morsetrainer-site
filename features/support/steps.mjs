import assert from "assert"
import { When, Then } from "@cucumber/cucumber"

When('something happen', function () {
    //this.whatIHeard = new Tokenizer().sayHello()
});

Then('something should be done', function () {
    assert.equal(1, 1)
});
