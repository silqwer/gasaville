# 1. 어떤 이미지를 사용해서 빌드할 것인지를 정의 
# - Docker Hub에 있는 node의 최신 LTS(장기 지원) 버전인 carbon을 사용
FROM node:carbon

# 2. 도커 이미지 안에 애플리케이션 코드를 넣기 위해 디렉토리를 생서 
# - 이 디렉토리가 애플리케이션의 워킹 디렉토리가 됨
WORKDIR /usr/src/app

# 3. 앱 의존성 설치 
COPY package*.json ./
RUN npm install

# 4. 도커 이미지 안에 앱의 소스코드를 넣기
COPY ..

# 5. 앱이 8080 포트에 바인딩 되어 있으므므로 EXPOSE를 사용해 도커 데몬에 매핑 
EXPOSE 8080

# 6. 마지막으로 런타임을 정의하는 CMD로 앱을 실행하는 중요 명령어 정의 
# - 서버를 구동하도록 node server.js 를 기본 npm start 사용
CMD ["npm", "start"] 