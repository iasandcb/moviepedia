import { useState } from 'react';
import './ReviewForm.css';
import FileInput from './FileInput';
import RatingInput from './RatingInput';
import { createReview } from '../api';

const INITIAL_VALUES = {
  title: '',
  rating: 0,
  content: '',
  imgFile: null,
};

export default function ReviewForm(
  { initialValues = INITIAL_VALUES,
    initialPreview,
    onCancel,
    onSubmitSuccess }
) {
  const [values, setValues] = useState(initialValues);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('rating', values.rating);
    formData.append('content', values.content);
    formData.append('imgFile', values.imgFile);
    const result = await createReview(formData);
    const { review } = result;
    setValues(INITIAL_VALUES);
    onSubmitSuccess(review);
  }

  return (
    <form className='ReviewForm' onSubmit={handleSubmit}>
      <FileInput 
        name="imgFile" 
        value={values.imgFile} 
        onChange={handleChange} 
        initialPreview={initialPreview}
      />
      <input name="title" value={values.title} onChange={handleInputChange}/>
      <RatingInput name="rating" value={values.rating} onChange={handleChange}  />
      <textarea name="content" value={values.content} onChange={handleInputChange}  />
      {onCancel && <button onClick={onCancel}>취소</button>}
      <button type="submit">확인</button>
    </form>
  )
}
