# react-image-select-zjs
A component to select image and preview when use react in a form

## Install

`npm install -S 'react-image-select-zjs';`

## Usage

```
  import ImageSelect from 'react-image-select-zjs';
  
  ...
  onChange = (files) => {
    ...
  }
  onError = (errorMsg) => {
    ...
  }
  render(){
    return (
      ...
      <ImageSelect 
        onChange={this.onChange} 
        onError={this.onError} 
        name="fieldName"
        label="+"
        labelSize={80}
        max={9} />
      ...
    )
  }
  ...
```
## Properties

- onChange(files) 
- onError(errorMsg) 
- label : select button text , default is '+'
- labelSize : select button text size, default is 80
- max : the maximum number of files, default is 9


