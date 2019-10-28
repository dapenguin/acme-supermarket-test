# ACME Supermarket

Create a solution for the ACME Supermarket problem.

## Anthony's Notes

### Setup

```
npm install
```

### Usage

To create a new basket instance:

```
const basket = new Basket(pricingRules);
```

To add a product to the basket, use the `add()` method passing in the product code as the only parameter:

```
basket.add('CF1');
```

To get the basket total, use the `total()` method.

```
const price = basket.total();
```

### Running the tests

```
npm test
```

### Pricing Rules Model

I initially started thinking about how I would go about having product and promotion rules as separate objects within the pricing rules. However, I opted to have the promotion rules specified for each product as this felt like a simpler way.

Also, I realise that the product name is never used. There would likely be a separate object for product details like this.

### What else would I have done if I spent more time?

 - Make the constructor defensive, requiring that `pricingRules` be passed in to the constructor.
 - The tests are for the specific scenarios mentioned in the Readme. I would have liked to have at least added individual tests for the `calculateDiscount()`, `calculateMinItemsDiscount()` and `calculatePerItemDiscount()` methods.
 - Be a bit more consistent or thoughtful with some of my naming.

## Description of the problem

ACME's quest for global domination has prompted us to open a supermarket – we sell only three products:

    Product code        Name            Price

    FR1                 Fruit tea       £ 3.11
    SR1                 Strawberries    £ 5.00
    CF1                 Coffee          £11.23

Our CEO is a big fan of buy-one-get-one-free offers and of fruit tea. He wants us to add a rule to do this.

The COO, though, likes low prices and wants people buying strawberries to get a price discount for bulk purchases. If you buy 3 or more strawberries, the price should drop to £4.50.
Our check-out can scan items in any order, and because the CEO and COO change their minds often, it needs to be flexible regarding our pricing rules.

The interface to our basket looks like this (shown in JavaScript):

    var basket = new Basket(pricingRules)
    basket.add(item)
    basket.add(item)
    var price = basket.total()

Implement a basket system that fulfills these requirements in JavaScript.

Test Data:

    Basket: FR1, SR1, FR1, CF1
    Total price expected: £19.34

    Basket: FR1, FR1
    Total price expected: £3.11

    Basket: SR1, SR1, FR1, SR1
    Total price expected: £16.61
