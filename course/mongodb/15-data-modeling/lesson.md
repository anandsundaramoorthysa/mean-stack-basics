**Data modelling** means deciding how your information is split into documents and collections. MongoDB does not force a shape on you, so you choose one. The guiding rule: **design documents around the questions your application asks**, and keep data that is read together stored together.

## Embedding

**Embedding** puts related data inside the parent document, as an object or an array.

```js
{
  orderNo: 'A100',
  customer: { name: 'Asha', city: 'Madurai' },
  items: [{ sku: 'PEN', qty: 2, price: 10 }]
}
```

One read returns the whole order, with no join. Embedding fits when:

- the child data belongs to one parent only (order items belong to one order);
- you almost always read them together;
- the array stays reasonably small.

## Referencing

**Referencing** stores only an id that points to a document in another collection, like `customerId: 1`. You join with `$lookup` when needed.

```js
{ orderNo: 'A100', customerId: 1 }
```

Referencing fits when:

- many parents share the same child (many orders, one customer profile);
- the child is large or changes often, and you want one place to update it;
- the list can grow without limit. A single document may not exceed 16 MB, so never embed something that can grow forever, such as every comment on a very popular post.

## One-to-many

For "one author has few books", embed an array of books. For "one author has thousands of posts", keep posts in their own collection and put `authorId` on each post.

## Duplicating on purpose

Copying a value into another document is called **denormalising**. It makes reads faster at the cost of updates. It is the right choice when the copied value is a snapshot that should not change. An order should keep the price the customer paid, even if the product's price changes next week. It is risky when the copy is meant to stay current, such as a customer's phone number.
