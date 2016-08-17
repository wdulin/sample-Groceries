//make sure you import mocha-config before @angular/core
import { assert } from "../../test-config";
import { User } from "../../../shared";

// declare var describe: any;
// declare var expect: any;
// declare var it: any;

describe("Email validation", function() {
  let user = new User();

  it("Should reject an empty email address", function () {
    user.email = "";
    assert.isFalse(user.isValidEmail());
  });

  it("Should reject a malformed email addresses", function() {
    user.email = "nativescript";
    assert.isFalse(user.isValidEmail());

    user.email = "nativescript@";
    assert.isFalse(user.isValidEmail());

    user.email = "nativescript@isawesome";
    assert.isFalse(user.isValidEmail());
  });

  it("Should accept valid email addresses", function() {
    user.email = "nativescript@isawesome.com";
    assert.isTrue(user.isValidEmail());
  });
});
