# discord-embed-validator

[joi](https://github.com/sideway/joi) schema for validating Discord Embed Objects.

The official documentation for the Embed Object can be found [here](https://discord.com/developers/docs/resources/channel#embed-object), and its limits [here](https://discord.com/developers/docs/resources/channel#embed-limits).

## Install

```
npm install discord-embed-validator
```

## Usage examples

### Valid Embed

```js
const validator = require('discord-embed-validator')

const embed = {
  title: 'This is my valid embed!',
  fields: [
    {
      name: 'It has a field',
      value: 'And the field has a value!'
    }
  ]
}

validator.validate(embed)
// { value: { title: 'This is my valid embed!', fields: [ [Object] ] } }
```

### Invalid Embed

```js
const validator = require('discord-embed-validator')

const invalidEmbed = {
  title: 'This one is invalid',
  fields: [
    {
      'title': 'Because this field uses "title" instead of "name", and is missing its value!'
    }
  ]
}

validator.validate(invalidEmbed)
/*
{
  value: { title: 'This one is invalid', fields: [ [Object] ] },
  error: [Error [ValidationError]: "fields[0].name" is required] {
    _original: { title: 'This one is invalid', fields: [Array] },
    details: [ [Object] ]
  }
}
*/
```
