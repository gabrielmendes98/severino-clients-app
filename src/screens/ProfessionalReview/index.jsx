import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import professionalsService from 'api/services/professionals';
import Form from 'common/providers/Form';
import toast from 'common/util/toast';
import TextInput from 'components/Input/TextInput';
import Text from 'components/Text';
import Button from 'components/Button';
import Stars from 'components/Stars';
import { form } from './util';

const ProfessionalReview = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  const handleReview = data => {
    if (!rating) {
      toast.error('Selecione uma quantidade de estrelas para sua avaliação');
      throw new Error(
        'Selecione uma quantidade de estrelas para sua avaliação',
      );
    }
    professionalsService
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
                console.log(e.nativeEvent.contentSize.height);
                setTextHeight(e.nativeEvent.contentSize.height);
              }}
              style={{ height: Math.max(35, textHeight) }}
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

export default ProfessionalReview;
