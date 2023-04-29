import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApi } from '../../hooks/useApi';
import { reportSchema } from './reportSchema';
import { ReportData } from '../../../shared/model/ReportData';
import { Input } from './Input';
import { ImageList } from './ImageList';

export function ReportDetailPage() {
  const params = useParams();
  const reportId = params.id ?? '';
  const {
    value: report,
    loading,
    error,
  } = useApi((api) => api.report.read(reportId), [reportId]);

  if (!report) {
    // todo handle error
    return null;
  }

  return (
    <div>
      {report.id}
      <ReportForm report={report} />
    </div>
  );
}

function ReportForm({ report }: { report: ReportData }) {
  const { handleSubmit, register, control } = useForm({
    resolver: yupResolver(reportSchema),
    defaultValues: report,
  });

  const onSubmit = (value: ReportData) => {
    console.log(value);
  };

  return (
    <form>
      <fieldset>
        <Input
          input={{ ...register('createdAt'), type: 'date' }}
          label="Fecha"
        />
        <Input input={register('done')} />
      </fieldset>
      <fieldset>
        <Input label="Nombre" input={register('patientInstance.firstName')} />
        <Input label="Apellido" input={register('patientInstance.lastName')} />
        <Input label="Edad" input={register('patientInstance.age')} />
        <Input
          label="Peso"
          input={{
            type: 'number',
            ...register('patientInstance.weight', { valueAsNumber: true }),
          }}
        />
        <Input label="Talla" input={register('patientInstance.size')} />
      </fieldset>
      <fieldset>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input label="AO" input={register('measurements.ao')} />
            <Input label="AI" input={register('measurements.ai')} />
            <Input label="VIDD" input={register('measurements.vidd')} />
            <Input label="VIDS" input={register('measurements.vids')} />
            <Input label="FA" input={register('measurements.fa')} />
          </div>
          <div>
            <Input label="SEPTUM" input={register('measurements.septum')} />
            <Input
              label="P POSTERIOR"
              input={register('measurements.pposterior')}
            />
            <Input label="VD" input={register('measurements.vd')} />
            <Input label="AD" input={register('measurements.ad')} />
            <Input label="Pulmon" input={register('measurements.pulmon')} />
            <Input label="Fey" input={register('measurements.fey')} />
          </div>
        </div>
        <Input
          label="Ventriculo Izquierdo"
          input={register('measurements.ventriculoIzquierdo')}
        />
        <Input
          label="Ventriculo Derecho"
          input={register('measurements.ventriculoDerecho')}
        />
        <Input
          label="Auricula Izquierda"
          input={register('measurements.auriculaDerecha')}
        />
        <Input
          label="Auricula Derecha"
          input={register('measurements.auriculaIzquierda')}
        />
        <Input
          label="Valvula Aortica"
          input={register('measurements.valvulaAortica')}
        />
        <Input
          label="Valvula Mitral"
          input={register('measurements.valvulaMitral')}
        />
        <Input
          label="Valvula Pulmonar"
          input={register('measurements.valvulaPulmonar')}
        />
        <Input
          label="Valvula Tricuspidea"
          input={register('measurements.valvulaTricuspidea')}
        />
        <Input
          label="Pericardio"
          input={register('measurements.valvulaTricuspidea')}
        />
      </fieldset>
      <fieldset>
        <ImageList control={control} name="images" />
      </fieldset>

      <button type="submit" className="btn">
        Guardar
      </button>
    </form>
  );
}
