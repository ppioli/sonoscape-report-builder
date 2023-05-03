import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { reportSchema } from './reportSchema';
import { ReportData } from '../../../shared/model/ReportData';
import { Input } from './Input';
import { ImageList } from './ImageList';

enum Tabs {
  PATIENT = 'PATIENT',
  MEASUREMENTS = 'MEASUREMENTS',
  IMAGES = 'IMAGES',
}

function ReportForm({ report }: { report: ReportData }) {
  const { handleSubmit, register, control } = useForm({
    resolver: yupResolver(reportSchema),
    defaultValues: report,
  });
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.PATIENT);

  const onSubmit = (value: ReportData) => {
    console.log(value);
  };

  return (
    <div>
      <div className="tabs w-full d-flex justify-center">
        <button
          type="button"
          className={classNames('tab tab-lifted', {
            'tab-active': selectedTab === Tabs.PATIENT,
          })}
          onClick={() => setSelectedTab(Tabs.PATIENT)}
        >
          Paciente
        </button>
        <button
          type="button"
          className={classNames('tab tab-lifted', {
            'tab-active': selectedTab === Tabs.MEASUREMENTS,
          })}
          onClick={() => setSelectedTab(Tabs.MEASUREMENTS)}
        >
          Mediciones
        </button>
        <button
          type="button"
          className={classNames('tab tab-lifted', {
            'tab-active': selectedTab === Tabs.IMAGES,
          })}
          onClick={() => setSelectedTab(Tabs.IMAGES)}
        >
          Imagenes
        </button>
      </div>
      <div className="card card-compact bg-base-100 shadow-xl p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            className={classNames({ hidden: selectedTab !== Tabs.PATIENT })}
          >
            <Input
              input={{ ...register('createdAt'), type: 'date' }}
              label="Fecha"
            />
            <Input input={register('done')} />
            <Input
              label="Nombre"
              input={register('patientInstance.firstName')}
            />
            <Input
              label="Apellido"
              input={register('patientInstance.lastName')}
            />
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
          <fieldset
            className={classNames({
              hidden: selectedTab !== Tabs.MEASUREMENTS,
            })}
          >
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Input label="AO" input={register('measurements.ao')} />
                <Input label="AI" input={register('measurements.ai')} />
                <Input label="VIDD" input={register('measurements.vidd')} />
                <Input label="VIDS" input={register('measurements.vids')} />
              </div>
              <div>
                <Input label="FA" input={register('measurements.fa')} />
                <Input label="SEPTUM" input={register('measurements.septum')} />
                <Input
                  label="P POSTERIOR"
                  input={register('measurements.pposterior')}
                />
                <Input label="VD" input={register('measurements.vd')} />
              </div>
              <div>
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
          <fieldset
            className={classNames({ hidden: selectedTab !== Tabs.IMAGES })}
          >
            <ImageList control={control} name="images" />
          </fieldset>

          <button type="submit" className="btn">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

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
      <ReportForm report={report} />
    </div>
  );
}
