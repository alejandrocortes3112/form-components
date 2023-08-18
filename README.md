# Visio React-Hook-Form base components

Set of reusable controlled input components provided by [MUI](https://mui.com/) and ready to be used with [react-hook-form](https://react-hook-form.com/).

## Installation

### `yarn add visio-react-base`

### `npm install visio-react-base`

## Libraries we used

[react-hook-form](https://react-hook-form.com/)

[MUI](https://mui.com/)

[react-number-format](https://s-yadav.github.io/react-number-format/docs/intro/)

[axios-hooks](https://github.com/simoneb/axios-hooks)

## Basic usage

Import the component or components you want to use and plug them in your form. See example below:

```javascript
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {InputText} from "visio-rhf-base";
...

const schema = yup.object().shape({
  name: yup.string(),
})

const { ...methods } = useForm({
  resolver: yupResolver(schema),
  defaultValues: {
    name: "",
  },
});
<form>
  <InputText
    name="name"
    control={methods.control}
    label="Name"
    fullWidth
  />
  <Button type="submit">Send</Button>
</form>
```

We don't require the use of react-hook-form [useFormContext](https://react-hook-form.com/api/useformcontext/#main) wrapping the form for these simple components, but feel free to use it.

## Available components

## Required props

Just 2 props are required

- control
- name

### InputText

Most basic of the elements, designed to accept text or number, you can pass all the attributes available for [TextField](https://mui.com/material-ui/react-text-field/).

```javascript
<InputText name="name" control={methods.control} label="Name" />
```

### InputNumber

This is based on [numeric-format](https://s-yadav.github.io/react-number-format/docs/numeric_format) from [react-number-format](https://s-yadav.github.io/react-number-format/docs/intro/). It is going to allow only number inputs and will return a float when you type. You can extend this components using the props in the documentation, you can specify decimals, format as a currency or just as a good old number. Below you have 2 examples

```javascript
<InputNumber
  name="creditScore"
  control={methods.control}
  label="Credit Score"
/>
```

```javascript
<InputNumber
  name="amount"
  control={methods.control}
  label="Amount"
  thousandSeparator=","
  prefix="$"
  decimalScale={2}
/>
```

### InputPattern

This is based on [pattern-format](https://s-yadav.github.io/react-number-format/docs/pattern_format) from [react-number-format](https://s-yadav.github.io/react-number-format/docs/intro/). It is going to format your string according to the format parameter you pass, this returns a formatted string. You can extend this using any props in the react-number-format and MUI libraries. Examples below for a FEIN and a US phone:

```javascript
<InputPattern
  name="fein"
  label="FEIN"
  control={control}
  format="##-#######"
  allowEmptyFormatting
  mask="_"
/>
```

```javascript
<InputPattern
  name="phone"
  label="Phone"
  control={control}
  format="(###) ###-####"
  allowEmptyFormatting
  mask="_"
/>
```

### InputSelect

Select component which is going to accept a group of options and display them as a combobox.

```javascript
<InputSelect
  name="contactMethod"
  control={methods.control}
  label="Contact Method"
  options={
    ({ label: "Phone", value: "Phone" }, { label: "Email", value: "Email" })
  }
/>
```

### InputRadio

Radio component which is going to accept a group of options and display them as radio options.

```javascript
<InputRadio
  name="contactMethod"
  control={methods.control}
  label="Contact Method"
  options={
    ({ label: "Phone", value: "Phone" }, { label: "Email", value: "Email" })
  }
/>
```

### InputCheckbox

Checkbox component to render boolean fields. It will send a boolean value to the form

```javascript
<InputCheckbox
  name="vaccinated"
  control={methods.control}
  label="Vaccinated?"
/>
```

### FUTURE FEATURES WIP

Find a clean way to add \* to required fields
