import {
  Control,
  FieldPathByValue,
  FieldValues,
  useFieldArray,
} from 'react-hook-form';
import { ImageListItem } from './ImageListItem';

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
    <div className="grid grid-cols-2 gap-3">
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
