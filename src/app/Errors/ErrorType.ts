export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  error: TErrorSource;
};

export type TErrorSource = {
  path: string | number;
  message: string;
}[];
