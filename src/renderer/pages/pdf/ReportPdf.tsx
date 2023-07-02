import { Document, Font, Image, Page, Text, View } from '@react-pdf/renderer';
import { ReportData } from '../../../shared/model/ReportData';
import { styles } from './Styles';

export function ReportPdf({
  report,
  images,
}: {
  report: ReportData;
  images: Record<string, string | null>;
}) {
  const { patientInstance: patient, measurements, flow } = report;
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed />
        <Text style={styles.title}>Reporte de Ecocardiografía Doppler</Text>

        <Text style={styles.author}>Dr. Adalberto R. Rubin - MP 3296</Text>
        <Text style={styles.author}>Sonoscape E3</Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Paciente</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Nombres:</Text>
            <Text style={styles.text}>
              {`${patient.firstName} ${patient.lastName}`}
            </Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Talla:</Text>
            <Text style={styles.text}>{`${patient.size}`}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Peso:</Text>
            <Text style={styles.text}>{`${patient.weight}kg`}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Edad:</Text>
            <Text style={styles.text}>{`${patient.age} anos`}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Mediciones</Text>
        <Text style={styles.text}>This is mock data: Waaah</Text>
        <Text style={styles.subtitle}>Flujos</Text>
        <Text style={styles.text}>This is more data</Text>
        <Text style={styles.subtitle}>Conclusion</Text>
        <Text style={styles.text} />
        <Text style={styles.subtitle}>Imagenes</Text>
        {/* TODO Add missing image placeholder */}
        {Object.entries(images).map(([imageId, src]) => (
          <Image style={styles.image} src={src ?? ''} />
        ))}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
