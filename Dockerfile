FROM mcr.microsoft.com/playwright:v1.39.0-jammy

ARG HTTP_CREDENTIALS_USER_NAME
ARG HTTP_CREDENTIALS_PASSWORD

ENV HTTP_CREDENTIALS_USER_NAME=$HTTP_CREDENTIALS_USER_NAME
ENV HTTP_CREDENTIALS_PASSWORD=$HTTP_CREDENTIALS_PASSWORD

COPY . /playwright-sonik
WORKDIR /playwright-sonik

RUN npm ci

CMD ["npm", "test"]