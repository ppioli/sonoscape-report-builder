import { ApiError } from '../shared/ApiError';

export function ErrorPage({ error }: { error: ApiError | null }) {
  return <div>: Kaboom! Error {error?.message}</div>;
}
