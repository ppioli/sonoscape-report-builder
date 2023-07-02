import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { reportSchema } from './reportSchema';
import { defaultReport, ReportData } from '../../../shared/model/ReportData';
import { Input } from './Input';
import { ImageList } from './ImageList';
import { api } from '../../api';

enum Tabs {
  PATIENT = 'PATIENT',
  MEASUREMENTS = 'MEASUREMENTS',
  IMAGES = 'IMAGES',
  FLOWS = 'FLOWS',
}

function ReportForm({ report, id }: { report: ReportData; id: string }) {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(reportSchema),
    defaultValues: report,
  });
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.PATIENT);

  const onSubmit = async (value: ReportData) => {
    if (id) {
      try {
        const result = await api.report.update(id, value);
      } catch (e) {
        // Todo fix this
        console.error(e);
      }
    }
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
            'tab-active': selectedTab === Tabs.FLOWS,
          })}
          onClick={() => setSelectedTab(Tabs.FLOWS)}
        >
          Flujos
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
              control={control}
              name="createdAt"
              label="Fecha"
              type="date"
            />
            <Input className="hidden" control={control} name="done" />
            <Input
              label="Nombre"
              name="patientInstance.firstName"
              control={control}
            />
            <Input
              label="Apellido"
              control={control}
              name="patientInstance.lastName"
            />
            <Input
              label="DNI"
              control={control}
              name="patientInstance.lastName"
            />
            <Input label="Edad" name="patientInstance.age" control={control} />
            <Input
              label="Peso"
              type="number"
              control={control}
              name="patientInstance.weight"
            />
            <Input
              label="Altura"
              name="patientInstance.size"
              control={control}
            />
            <Input
              label="Medico Solicitante"
              name="patientInstance.size"
              control={control}
            />
          </fieldset>
          <fieldset
            className={classNames({
              hidden: selectedTab !== Tabs.MEASUREMENTS,
            })}
          >
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Input label="AO" name="measurements.ao" control={control} />
                <Input label="AI" control={control} name="measurements.ai" />
                <Input
                  label="VIDD"
                  control={control}
                  name="measurements.vidd"
                />
                <Input
                  label="VIDS"
                  control={control}
                  name="measurements.vids"
                />
              </div>
              <div>
                <Input label="FA" control={control} name="measurements.fa" />
                <Input
                  label="SEPTUM"
                  control={control}
                  name="measurements.septum"
                />
                <Input
                  label="P POSTERIOR"
                  control={control}
                  name="measurements.pposterior"
                />
                <Input label="VD" control={control} name="measurements.vd" />
              </div>
              <div>
                <Input label="AD" control={control} name="measurements.ad" />
                <Input
                  label="Pulmon"
                  control={control}
                  name="measurements.pulmon"
                />
                <Input label="FEy" control={control} name="measurements.fey" />
              </div>
            </div>
            <Input
              label="Ventriculo Izquierdo"
              control={control}
              name="measurements.ventriculoIzquierdo"
            />
            <Input
              label="Ventriculo Derecho"
              control={control}
              name="measurements.ventriculoDerecho"
            />
            <Input
              label="Auricula Izquierda"
              control={control}
              name="measurements.auriculaDerecha"
            />
            <Input
              label="Auricula Derecha"
              control={control}
              name="measurements.auriculaIzquierda"
            />
            <Input
              label="Valvula Aortica"
              control={control}
              name="measurements.valvulaAortica"
            />
            <Input
              label="Valvula Mitral"
              control={control}
              name="measurements.valvulaMitral"
            />
            <Input
              label="Valvula Pulmonar"
              control={control}
              name="measurements.valvulaPulmonar"
            />
            <Input
              label="Valvula Tricuspidea"
              control={control}
              name="measurements.valvulaTricuspidea"
            />
            <Input
              label="Pericardio"
              control={control}
              name="measurements.pericardio"
            />
          </fieldset>
          <fieldset
            className={classNames({ hidden: selectedTab !== Tabs.FLOWS })}
          >
            <Input label="Aortico" control={control} name="flow.aortico" />
            <Input label="Mitral" control={control} name="flow.mitral" />
            <Input label="Pulmonar" control={control} name="flow.pulmonar" />
            <Input
              label="Tricuspedeo"
              control={control}
              name="flow.tricuspideo"
            />
            <Input
              label="Conclusiones"
              control={control}
              name="flow.conclusiones"
            />
          </fieldset>
          <fieldset
            className={classNames({ hidden: selectedTab !== Tabs.IMAGES })}
          >
            <ImageList control={control} name="images" />
          </fieldset>
          <div className="w-full flex flex-row-reverse mt-4">
            <button type="submit" className="btn">
              Guardar
            </button>
            <button type="button" className="btn" onClick={() => navigate(-1)}>
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
/*
FA => Regla 3 simple
VIDD => Diastoligo grande
VIDS => Sistoligo expluso => Chico
AD / AI => Aurticulas
 */
export function ReportDetailPage() {
  const params = useParams();
  const reportId = params.id ?? '';
  const {
    value: report,
    loading,
    error,
  } = useApi(
    (api) =>
      reportId === ''
        ? Promise.resolve({ value: defaultReport() })
        : api.report.read(reportId),
    [reportId]
  );

  if (!report) {
    // todo handle error
    return null;
  }
  return (
    <div>
      <ReportForm report={report} id={reportId} />
    </div>
  );
}
