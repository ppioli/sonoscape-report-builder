import { object, ObjectSchema, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ConfigData } from '../../../shared/model/ConfigData';
import { useApi } from '../../hooks/useApi';
import { ErrorPage } from '../../ErrorPage';
import { api } from '../../api';
import { isApiError } from '../../../shared/ApiResponse';

const configSchema: ObjectSchema<ConfigData> = object().shape({
  masterDir: string().required(),
});

function ConfigForm({ config }: { config: ConfigData }) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: config,
    resolver: yupResolver(configSchema),
  });

  const selectDirectory = async () => {
    let selectedDir: string | null = null;
    try {
      selectedDir = await api.file.showDirectoryPicker().then((response) => {
        if (isApiError(response)) {
          // todo handle error
          return null;
        }
        return response.value;
      });
    } catch (e) {
      // todo handle error
      console.error(e);
    }
    setValue('masterDir', selectedDir ?? '');
  };
  const onSubmit: SubmitHandler<ConfigData> = async (value) => {
    console.log('submit');
    try {
      const response = await api.config.save(value);
      console.log('Respnose', response);
      if (isApiError(response)) {
        // todo handle error
        console.log(response.message);
      }
    } catch (e) {
      // todo handle error
      console.log(e);
    }
  };
  return (
    <form className="space-y-4">
      {/* <div> */}
      {/*  <label className="label"> */}
      {/*    <span className="text-base label-text">Name</span> */}
      {/*  </label> */}
      {/*  <input */}
      {/*    type="text" */}
      {/*    placeholder="Name" */}
      {/*    className="w-full input input-bordered" */}
      {/*  /> */}
      {/* </div> */}
      <div>
        <div className="form-control">
          <div className="label">
            <span className="label-text">Directorio master</span>
          </div>
          <label className="input-group">
            <input
              type="text"
              {...register('masterDir')}
              readOnly
              className="file-input w-full input-bordered"
            />
            <button onClick={selectDirectory} type="button" className="btn">
              Seleccionar
            </button>
          </label>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-block"
          onClick={handleSubmit(onSubmit)}
        >
          Guardar
        </button>
      </div>
    </form>
  );
}

export function ConfigPage() {
  const { loading, value, error } = useApi((a) => a.config.read(), []);

  if (!value) {
    if (loading) {
      return null;
    }
    return <ErrorPage error={error} />;
  }
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="w-full p-6 m-auto rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
        <ConfigForm config={value} />
      </div>
    </div>
  );
}
