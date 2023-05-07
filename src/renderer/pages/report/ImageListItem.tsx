import {
  Control,
  FieldPathByValue,
  FieldValues,
  useController,
} from 'react-hook-form';
import { useState } from 'react';
import { Image } from '../../../main/db/model/Image';
import { useApi } from '../../hooks/useApi';

export interface ImageListItemProps<
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, ImageData>
> {
  control: Control<TFieldValues>;
  name: FieldPathByValue<TFieldValues, TPath>;
}

export function ImageListItem<
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, ImageData>
>({ name, control }: ImageListItemProps<TFieldValues, TPath>) {
  const {
    field: { ref, value, onBlur, onChange },
    fieldState,
  } = useController({
    control,
    name,
  });
  const { id, fileName } = value as Image;
  const [hover, setHover] = useState(false);
  const {
    value: imageData,
    loading,
    error,
  } = useApi((api) => api.file.getImage(id), [id]);

  return (
    <div
      className="card bg-base-100 shadow-xl relative hover:ring-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <figure
        style={{
          borderRadius: 'inherit',
        }}
      >
        <img src={imageData ?? ''} alt="Shoes" />
      </figure>
      {hover && (
        <div className="absolute w-full h-full p-5">
          <div className="flex flex-col justify-between align-middle w-full h-full">
            {/* <div> */}
            {/*  <h2 className="card-title">{id}</h2> */}
            {/*  <p className="break-all">{fileName}</p> */}
            {/* </div> */}
            {JSON.stringify(fieldState)}
            <div>
              <div className="card-actions justify-end">
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
