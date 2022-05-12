import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { workersEndpoints } from 'api/services/workers';
import { render, NavigationContextProvider, fireEvent } from 'test-utils';
import { apiMock } from 'api/util';
import * as storage from 'common/util/storage';
import useUser from 'common/contexts/User/useUser';
import { formatPhone, onlyNumbersFormat } from 'common/util/formatters';
import WorkerProfile from '../index';

const workerId = 'workerId';

const baseMockData = {
  id: '7e3dfd68-8811-40bb-ac9b-9b027b16db85',
  avatarUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjGm7ft_-D0lYtbCOKZkhpPL0Osdu8fWoEugYRMTX2on1UO6Irv6OPaxflsbotaWd9ozqRYVhVzAxLfg&usqp=CAU',
  name: 'mock name',
  rating: 3.5,
  hasWhatsapp: true,
  phone: '34999999999',
  location: 'Amapá, AP',
  services: ['Pedreiro', 'Limpeza Industrial'],
  description: 'Sou um trabalhador muito esforçado!',
  workPhotos: [],
  experiences: [],
  academicGraduations: [],
  skills: [],
  isFavorite: true,
};

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));
const navigate = jest.fn();
useNavigation.mockImplementation(() => ({
  navigate,
}));
useRoute.mockImplementation(() => ({
  params: {
    workerId,
  },
}));

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('api data mock one', () => {
  const api = apiMock();
  const mockData = { ...baseMockData };
  api.onGet(workersEndpoints.profile(workerId)).reply(200, mockData);

  it('should be able to navigate to worker review list screen', async () => {
    const { findByText } = render(
      <NavigationContextProvider>
        <WorkerProfile />
      </NavigationContextProvider>,
    );

    fireEvent(await findByText(/ver avaliações/i), 'press');

    expect(navigate).toHaveBeenCalledWith('Worker', {
      screen: 'ReviewsList',
      params: {
        workerId,
        workerName: mockData.name,
      },
    });
  });

  it('should be able to navigate to worker review screen if is signed', async () => {
    jest
      .spyOn(storage, 'getToken')
      .mockReturnValue(
        Promise.resolve(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYzI5ZDA3ZGEtNTg1Yi00ZWU4LThiNGItNTk5NGRkYTViNTQ5IiwiZW1haWwiOiJnYWJyaWVseEBnbWFpbC5jb20iLCJuYW1lIjoiR2FicmllbCBTb3V6YSIsImRlc2NyaXB0aW9uIjoiU291IHVtIHRyYWJhbGhhZG9yIG11aXRvIGVzZm9yw6dhZG8hIiwiYXZhdGFyVXJsIjoiaHR0cHM6Ly9lbmNyeXB0ZWQtdGJuMC5nc3RhdGljLmNvbS9pbWFnZXM_cT10Ym46QU5kOUdjUmpHbTdmdF8tRDBsWXRiQ09LWmtocFBMME9zZHU4ZldvRXVnWVJNVFgyb24xVU82SXJ2Nk9QYXhmbHNib3RhV2Q5b3pxUllWaFZ6QXhMZmcmdXNxcD1DQVUiLCJwaG9uZSI6IjM0OTk2ODYzNjYyIiwiY2l0eSI6eyJpZCI6ImM0ZDAzMWVjLTAwM2ItNGVjYi1hZjY0LTMyNjUxMWY2MjIzMyIsIm5hbWUiOiJVYmVybMOibmRpYSIsInN0YXRlSWQiOiI2MzlkNjViMi0zZWQ1LTQzYWItYTUzMi1mYzIzYWNmNmI2NDkifSwiaGFzV2hhdHNhcHAiOnRydWUsInByb2ZpbGUiOnsiaWQiOiJhOThhMmY3MS1lYzhkLTQzMzQtOGQzNC0xYmNkMjg0YTQ1ODYiLCJjcmVhdGVkQXQiOiIyMDIyLTA0LTA4VDEzOjMxOjMxLjYzMFoiLCJ1cGRhdGVBdCI6IjIwMjItMDQtMDhUMTM6MzE6MzEuNjMwWiIsIndvcmtlcklkIjoiYzI5ZDA3ZGEtNTg1Yi00ZWU4LThiNGItNTk5NGRkYTViNTQ5In19LCJpYXQiOjE2NDk0MjQ2OTEsImV4cCI6MTY1MjAxNjY5MX0.ghaRviYr9tT7kHZkm0PNDZbsXicFMgMefZ_UbxCwtCg',
        ),
      );

    const Component = () => {
      const { loading } = useUser();

      if (loading) return null;

      return <WorkerProfile />;
    };

    const { findByText } = render(
      <NavigationContextProvider>
        <Component />
      </NavigationContextProvider>,
    );

    fireEvent(await findByText(/avaliar/i), 'press');

    expect(navigate).toHaveBeenCalledWith('Worker', {
      screen: 'Review',
      params: {
        workerId,
        workerName: mockData.name,
      },
    });
  });

  it('should show error when try to navigate to worker review screen if is not signed', async () => {
    const Component = () => {
      const { loading } = useUser();

      if (loading) return null;

      return <WorkerProfile />;
    };

    const { findByText, getByText } = render(
      <NavigationContextProvider>
        <Component />
      </NavigationContextProvider>,
    );

    fireEvent(await findByText(/avaliar/i), 'press');

    expect(
      getByText(/você precisa estar logado para realizar essa ação/i),
    ).toBeTruthy();
  });

  it('should display if user is favorite', async () => {
    const Component = () => {
      const { loading } = useUser();

      if (loading) return null;

      return <WorkerProfile />;
    };

    const { findByTestId } = render(
      <NavigationContextProvider>
        <Component />
      </NavigationContextProvider>,
    );

    expect(await findByTestId(/favorite-button-filled/i)).toBeTruthy();
  });

  it('should display loading screen while fetching data', async () => {
    const { findByTestId } = render(
      <NavigationContextProvider>
        <WorkerProfile />
      </NavigationContextProvider>,
    );

    expect(await findByTestId('worker-profile-loading')).toBeTruthy();
  });

  it('should display worker name', async () => {
    const { findByText } = render(
      <NavigationContextProvider>
        <WorkerProfile />
      </NavigationContextProvider>,
    );

    expect(await findByText(new RegExp(mockData.name))).toBeTruthy();
  });

  it('should display worker evaluation', async () => {
    const { findAllByTestId, getAllByTestId } = render(
      <NavigationContextProvider>
        <WorkerProfile />
      </NavigationContextProvider>,
    );

    expect(await findAllByTestId('star')).toHaveLength(3);
    expect(getAllByTestId('star-half')).toHaveLength(1);
    expect(getAllByTestId('star-border')).toHaveLength(1);
  });

  it('should display worker number', async () => {
    const { findByText } = render(
      <NavigationContextProvider>
        <WorkerProfile />
      </NavigationContextProvider>,
    );

    expect(await findByText(formatPhone(mockData.phone))).toBeTruthy();
  });

  it('should display whatsapp button', async () => {
    const { findByTestId } = render(
      <NavigationContextProvider>
        <WorkerProfile />
      </NavigationContextProvider>,
    );

    expect(
      await findByTestId(
        `whatsapp-button-${onlyNumbersFormat(mockData.phone)}`,
      ),
    ).toBeTruthy();
  });

  it('should display worker location', async () => {
    const { findByText } = render(
      <NavigationContextProvider>
        <WorkerProfile />
      </NavigationContextProvider>,
    );

    expect(await findByText(mockData.location)).toBeTruthy();
  });

  it('should display worker description', async () => {
    const { findByText } = render(
      <NavigationContextProvider>
        <WorkerProfile />
      </NavigationContextProvider>,
    );

    expect(await findByText(mockData.description)).toBeTruthy();
  });

  it('should display worker services', async () => {
    const { findByText } = render(
      <NavigationContextProvider>
        <WorkerProfile />
      </NavigationContextProvider>,
    );

    expect(await findByText(mockData.services.join(' | '))).toBeTruthy();
  });

  it('should display worker work photos fallback', async () => {
    const { findByText } = render(
      <NavigationContextProvider>
        <WorkerProfile />
      </NavigationContextProvider>,
    );

    expect(
      await findByText(
        /este profissional não adicionou fotos de seus trabalhos/i,
      ),
    ).toBeTruthy();
  });

  it('should display worker experiences fallback', async () => {
    const { findByText } = render(
      <NavigationContextProvider>
        <WorkerProfile />
      </NavigationContextProvider>,
    );

    expect(
      await findByText(
        /este profissional não adicionou experiências profissionais/i,
      ),
    ).toBeTruthy();
  });

  it('should display worker academic graduations fallback', async () => {
    const { findByText } = render(
      <NavigationContextProvider>
        <WorkerProfile />
      </NavigationContextProvider>,
    );

    expect(
      await findByText(
        /este profissional não adicionou sua formação acadêmica/i,
      ),
    ).toBeTruthy();
  });

  it('should display worker skills fallback', async () => {
    const { findByText } = render(
      <NavigationContextProvider>
        <WorkerProfile />
      </NavigationContextProvider>,
    );

    expect(
      await findByText(/este profissional não adicionou competências/i),
    ).toBeTruthy();
  });
});

it('should display worker work photos', async () => {
  const api = apiMock();
  const mockData = {
    ...baseMockData,
    workPhotos: [
      {
        id: '9a92e625-bccf-40a0-8427-50e86237131c',
        createdAt: '2022-04-02T03:50:15.808Z',
        updateAt: '2022-04-02T03:50:15.808Z',
        profileId: 'b0c5c57a-357a-4a75-b09a-53ab33e2b134',
        url: 'https://image-upload-severino.s3.amazonaws.com/8d146ed47c1e9d3e57709b6130043c5b-boesijana-sGJ6QSqdK0U-unsplash.jpg',
        title: '',
      },
      {
        id: '0c32e408-e81d-47e1-9f70-ecdc1680f1d4',
        createdAt: '2022-04-02T03:53:01.768Z',
        updateAt: '2022-04-02T03:53:01.768Z',
        profileId: 'b0c5c57a-357a-4a75-b09a-53ab33e2b134',
        url: 'https://image-upload-severino.s3.sa-east-1.amazonaws.com/790ee461293a8ada1ce6a16c8f2fb6aa-boesijana-sGJ6QSqdK0U-unsplash.jpg',
        title: '',
      },
      {
        id: 'd447d2ba-bf2a-475c-b4c6-aeaf7a4287a8',
        createdAt: '2022-04-02T03:53:05.606Z',
        updateAt: '2022-04-02T03:53:05.606Z',
        profileId: 'b0c5c57a-357a-4a75-b09a-53ab33e2b134',
        url: 'https://image-upload-severino.s3.sa-east-1.amazonaws.com/841d9daca8e148212bc4d934316163b6-boesijana-sGJ6QSqdK0U-unsplash.jpg',
        title: '',
      },
      {
        id: '4ef21ce4-1aa5-4476-9eb4-6fe94f0b0f1f',
        createdAt: '2022-04-02T03:53:09.923Z',
        updateAt: '2022-04-02T03:53:09.923Z',
        profileId: 'b0c5c57a-357a-4a75-b09a-53ab33e2b134',
        url: 'https://image-upload-severino.s3.sa-east-1.amazonaws.com/63b2fff441c78e1e37ec22a15de385a5-boesijana-sGJ6QSqdK0U-unsplash.jpg',
        title: '',
      },
    ],
  };
  api.onGet(workersEndpoints.profile(workerId)).reply(200, mockData);

  const { findAllByTestId } = render(
    <NavigationContextProvider>
      <WorkerProfile />
    </NavigationContextProvider>,
  );

  expect(await findAllByTestId('worker-service-photo')).toHaveLength(
    mockData.workPhotos.length,
  );
});

it('should display worker experiences', async () => {
  const api = apiMock();
  const mockData = {
    ...baseMockData,
    experiences: [
      {
        id: '5d4ed85b-546b-4f03-9f5f-bd0abb721ab9',
        role: 'Engenheiro de Software',
        company: 'TQI',
        time: '2 anos',
      },
      {
        id: 'efcff734-7e43-43d0-b97a-2c4e6b23a44e',
        role: 'Freelancer',
        time: '3 anos',
      },
    ],
  };
  api.onGet(workersEndpoints.profile(workerId)).reply(200, mockData);

  const [firstExperience, secondExperience] = mockData.experiences;

  const { findByText, getByText } = render(
    <NavigationContextProvider>
      <WorkerProfile />
    </NavigationContextProvider>,
  );

  expect(await findByText(firstExperience.role)).toBeTruthy();
  expect(getByText(firstExperience.company)).toBeTruthy();
  expect(getByText(firstExperience.time)).toBeTruthy();

  expect(getByText(secondExperience.role)).toBeTruthy();
  expect(getByText(secondExperience.time)).toBeTruthy();
});

it('should display worker academic graduations', async () => {
  const api = apiMock();
  const mockData = {
    ...baseMockData,
    academicGraduations: [
      {
        id: 'd3a2f6ce-c361-4b10-8a80-c0bc6395cce6',
        institution: 'UFU',
        studyArea: 'Ciência da Computação',
        degree: {
          description: 'Ensino superior completo',
        },
      },
      {
        id: '967f9b79-5478-46c8-997b-1f250271c1b7',
        institution: 'Colégio Gabarito',
        studyArea: '',
        degree: {
          description: 'Ensino médio completo',
        },
      },
    ],
  };
  api.onGet(workersEndpoints.profile(workerId)).reply(200, mockData);

  const [firstGraduation, secondGraduation] = mockData.academicGraduations;

  const { findByText, getByText } = render(
    <NavigationContextProvider>
      <WorkerProfile />
    </NavigationContextProvider>,
  );

  expect(await findByText(firstGraduation.institution)).toBeTruthy();
  expect(getByText(firstGraduation.studyArea)).toBeTruthy();
  expect(getByText(firstGraduation.degree.description)).toBeTruthy();

  expect(getByText(secondGraduation.institution)).toBeTruthy();
  expect(getByText(secondGraduation.degree.description)).toBeTruthy();
});

it('should display worker skills', async () => {
  const api = apiMock();
  const mockData = {
    ...baseMockData,
    skills: [
      {
        id: '22aaf890-a04b-4542-b694-1096d7ef5d2d',
        createdAt: '2022-04-04T17:51:17.037Z',
        updateAt: '2022-04-04T17:51:17.037Z',
        profileId: 'b0c5c57a-357a-4a75-b09a-53ab33e2b134',
        name: 'Proativo',
      },
      {
        id: 'c7f41424-e531-418e-b1fc-3475f32306ed',
        createdAt: '2022-04-04T17:51:24.465Z',
        updateAt: '2022-04-04T17:51:24.465Z',
        profileId: 'b0c5c57a-357a-4a75-b09a-53ab33e2b134',
        name: 'Aprende Rápido',
      },
    ],
  };
  api.onGet(workersEndpoints.profile(workerId)).reply(200, mockData);

  const [firstSkill, secondSkill] = mockData.skills;

  const { findByText, getByText } = render(
    <NavigationContextProvider>
      <WorkerProfile />
    </NavigationContextProvider>,
  );

  expect(await findByText(firstSkill.name)).toBeTruthy();
  expect(getByText(secondSkill.name)).toBeTruthy();
});
