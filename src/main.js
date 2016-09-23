import React from 'react';
import ReactDom from "react-dom";
require('./main.css');

class ImageSelectZjs extends React.Component{
  static defaultProps = {
    label: '+',
    defaultValue : false,
    labelSize : 80,
    exts:'jpg|png|jpeg|gif|bmp',
    max : 2,
    onChange : () => {},
    onError : () => {},
  }

  constructor(props){
    super(props);
    this.state = {
      files : []
    }
  }

  defaultValueHandler(){
    if(this.props.defaultValue){
      var dval =[]

      if(!Array.isArray(this.props.defaultValue)){
        dval = [this.props.defaultValue];
      }else{
        dval = this.props.defaultValue
      }
    }

    if(!dval){return}

    var files = dval.map(item => {
      return {
        type : 'url',
        url : item
      }
    })

    this.setState({
      files : files
    });

    this.props.onChange(files.filter(file => !!file));
  }

  componentDidMount(){
    this.defaultValueHandler();
  }

  onChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    var files = e.target.files || e.dataTransfer.files;
  	for(var i in files){
      if(files[i] instanceof File){
        this.addFile(files[i])
      }
    }
  }

  addFile(file){
    if(this.state.files.filter(item => item).length >= this.props.max){
      this.props.onError('over limit file number');
      return;
    }

    var exp = new RegExp(`\.(${this.props.exts})$`,'ig');

    if(!file.name.match(exp)){
      this.props.onError('file type not allowed');
      return
    }

    this.state.files.push(file);
    this.startReadFile(this.state.files.length-1,file)
    this.setState({files: this.state.files})
    this.props.onChange(this.state.files.filter(file => !!file))
  }

  deleteFile(index){
    this.state.files[index] = null;
    this.setState({files : this.state.files})
    this.props.onChange(this.state.files.filter(file => !!file))
  }

  startReadFile(index,file){
    var reader = new FileReader;
    reader.onload = (e) => {
      this.endReadFile(index,file,e.target.result)
    };
  	reader.readAsDataURL(file);
  }

  endReadFile(index,file,base64){
    file.base64 = base64;
    this.state.files[index] = file;
    this.setState({
      files : this.state.files
    })
  }

  render(){
    return (
      <div className="image-select-zjs">

        <input ref={e => this.fileInput = e} type="file" style={{display : 'none'}} name={this.props.name} onChange={this.onChange}/>
        <div className="image-select-zjs-previews">
          {this.state.files.map((file,index) => {
            return this.renderPreview(file,index);
          })}
        </div>
        <div
          style={{
            display : this.state.files.filter(item => !!item).length >= this.props.max ? 'none': 'inline-block',
            fontSize : this.props.labelSize
          }}
          className="image-select-button"
          onClick={() => this.fileInput.click()}>
          {this.props.label}
        </div>
      </div>
    )
  }

  renderPreview(file,index){
    if(!file){return;}
    if(!file.base64 && !file.url){
      return (
        <div className="image-select-zjs-preview-item" key={index} onClick={e => this.deleteFile(index)}>
          Loading
        </div>
      )
    }
    return (
      <div
        className="image-select-zjs-preview-item"
        key={index}
        onClick={e => this.deleteFile(index)}
        style={{backgroundImage:'url('+ (file.base64 || file.url) +')'}}
        >
      </div>
    )
  }
}

export default ImageSelectZjs;
