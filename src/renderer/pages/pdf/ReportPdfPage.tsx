import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReportPdf } from './ReportPdf';
import { useApi, useAsync } from '../../hooks/useApi';
import { defaultReport, ReportData } from '../../../shared/model/ReportData';
import { api } from '../../api';
import { isApiError } from '../../../shared/ApiResponse';
import { ApiError, createError } from '../../../shared/ApiError';

const loadReportData = async (
  reportId: string
): Promise<[ReportData, Record<string, string | null>]> => {
  const response = await api.report.read(reportId);
  if (isApiError(response)) {
    throw response;
  }

  const imageData: Record<string, string | null> = {};
  const promises = response.value.images.map(async (image) =>
    api.file.getImage(image.id).then((imageResponse) => {
      imageData[image.id] = isApiError(imageResponse)
        ? null
        : imageResponse.value;
      return 0;
    })
  );

  await Promise.all(promises);

  return [response.value, imageData];
};

export function ReportPdfPage() {
  const params = useParams();
  const reportId = params.id ?? '';
  const navigate = useNavigate();
  const { loading, error, value } = useAsync(
    {
      func: () => loadReportData(reportId),
      enabled: reportId !== '',
    },
    [reportId]
  );

  if (!value) {
    // todo handle error
    return null;
  }

  const [report, images] = value;

  return (
    <div className="card card-compact bg-base-100 shadow-xl p-5 h-full">
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
      <PDFViewer className="w-full h-full" showToolbar={false}>
        <ReportPdf report={report} images={images} />
      </PDFViewer>
    </div>
  );
}
