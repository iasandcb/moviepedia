import { useState } from 'react';
import './ReviewForm.css';
import FileInput from './FileInput';
import RatingInput from './RatingInput';
import useAsync from '../hooks/useAsync';
import useTranslate from '../hooks/useTranslate';

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
    onSubmit,
    onSubmitSuccess }
) {
  const t = useTranslate();
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);

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

    const result = await onSubmitAsync(formData);
    if (!result) return;

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
      {onCancel && <button onClick={onCancel}>{t('cancel button')}</button>}
      <button disabled={isSubmitting} type="submit">
        {t('confirm button')}
      </button>
      {submittingError && <div>{submittingError.message}</div>}
    </form>
  )
}
