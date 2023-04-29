import {
  Control,
  FieldPathByValue,
  FieldValues,
  useController,
  useFieldArray,
} from 'react-hook-form';
import { useApi } from '../../hooks/useApi';
import { Image } from '../../../main/db/model/Image';

export interface ImageListProps<
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, ImageData[]>
> {
  control: Control<TFieldValues>;
  name: FieldPathByValue<TFieldValues, TPath>;
}
export function ImageList<
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, ImageData[]>
>({ control, name }: ImageListProps<any, any>) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name, // unique name for your Field Array
    }
  );
  return (
    <div>
      {fields.map((field, index) => (
        <ImageListItem
          key={field.id}
          control={control}
          name={`${name}.${index}`}
        />
      ))}
    </div>
  );
}

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
  } = useController({
    control,
    name,
  });
  const { id, fileName } = value as Image;
  const {
    value: imageData,
    loading,
    error,
  } = useApi((api) => api.file.getImage(id), [id]);

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl" ref={ref}>
      <figure>
        {imageData && <img src={imageData} alt="Shoes" />}
        {!imageData ?? <div>Placeholder</div>}
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
