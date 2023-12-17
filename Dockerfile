FROM mcr.microsoft.com/playwright:v1.39.0-jammy

COPY . /playwright-sonik
WORKDIR /playwright-sonik

RUN npm ci

CMD ["npm", "test"]