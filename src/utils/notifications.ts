import { useNotification } from '@kyvg/vue3-notification';

const { notify } = useNotification();

export const handleError = (text: string) => {
  notify({
    title: text,
    type: 'error',
  });
};

export const handleSuccess = (text: string) => {
  notify({
    title: text,
    type: 'success',
    duration: 10000,
  });
};
