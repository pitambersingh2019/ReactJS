export interface ToastInterface {
  Title: string;
  SubTitle: string;
}

export interface PromiseToastInterface {
  success: {
    Title: string;
    SubTitle: string;
  };
  pending: {
    Title: string;
    SubTitle: string;
  };
  error: {
    Title: string;
    SubTitle: string;
  };
}
