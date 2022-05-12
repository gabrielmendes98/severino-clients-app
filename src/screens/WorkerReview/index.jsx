import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import workersService from 'api/services/workers';
import Form from 'common/contexts/Form';
import toast from 'common/util/toast';
import theme from 'common/styles/theme';
import TextInput from 'components/Input/TextInput';
import Text from 'components/Text';
import Button from 'components/Button';
import { INPUT_HEIGHT } from 'components/Input/TextInput/style';
import Stars from 'components/Stars';
import { form, throwError } from './util';

const WorkerReview = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  const handleReview = data => {
    if (!rating) {
      toast.error('Selecione uma quantidade de estrelas para sua avaliação');
      throwError();
      return;
    }
    workersService
      .createReview({ workerId: route.params?.workerId, rating, ...data })
      .then(() => {
        toast.success('Agradecemos sua avaliação');
        navigation.navigate('Home');
      });
  };

  const onPressStars = index => setRating(index + 1);

  return (
    <View>
      <Text margin={{ bottom: 3 }} size={1.4} weight="bold">
        Avaliando {route.params?.workerName}
      </Text>

      <Stars length={rating} onPress={onPressStars} />

      <Form {...form}>
        {({ handleSubmit, formState: { isSubmitSuccessful } }) => (
          <>
            <TextInput placeholder="Título" name="title" />
            <TextInput
              placeholder="Mensagem"
              name="comment"
              multiline
              onContentSizeChange={e => {
                setTextHeight(e.nativeEvent.contentSize.height);
              }}
              style={{ height: Math.max(INPUT_HEIGHT, textHeight) }}
              containerProps={{
                style: {
                  height: Math.max(INPUT_HEIGHT, textHeight + theme.spacing(2)),
                },
              }}
            />

            <Button
              fullWidth
              onPress={handleSubmit(handleReview)}
              margin={{ top: 2 }}
              disabled={isSubmitSuccessful}
            >
              Enviar avaliação
            </Button>
          </>
        )}
      </Form>
    </View>
  );
};

export default WorkerReview;
