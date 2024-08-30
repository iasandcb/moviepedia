import { useState } from 'react';
import './ReviewForm.css';
import FileInput from './FileInput';

export default function ReviewForm() {
  const [values, setValues] = useState({
    title: '',
    rating: 0,
    content: '',
    imgFile: null,
  });

  // 통합(제어 비제어)
  const handleChange = (name, value) => {
    // state setter를 호출 할 때 인수로 콜백을 써야하는 경우
    // 새로 넣을 값이 기존 값을 바탕으로 만들어지는 경우
    // 더보기: 기존 보기 + 새 보기 
    setValues((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }

  // 제어쪽
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  }

  return (
    <form className='ReviewForm' onSubmit={handleSubmit}>
      <FileInput name="imgFile" value={values.imgFile} onChange={handleChange} />
      <input name="title" value={values.title} onChange={handleInputChange}/>
      <input type="number" name="rating" value={values.rating} onChange={handleInputChange}  />
      <textarea value={values.content} name="content" onChange={handleInputChange}  />
      <button type="submit">확인</button>
    </form>
  )
}
