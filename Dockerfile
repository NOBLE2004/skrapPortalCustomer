# Set the base image to node:12-alpine
FROM node:16-alpine as build

# Specify where our app will live in the container
WORKDIR /app

# Copy the React App to the container
COPY . /app/

RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    gcc \
    libc6-compat

RUN yarn install --frozen-lockfile --network-timeout 100000 \
    --ignore-platform \
    --ignore-optional \
    --ignore-scripts

RUN yarn build
#RUN apk add g++ gcc libgcc libstdc++ linux-headers make python3 --quiet

#RUN node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'

# Prepare the container for building React
# RUN npm install
#RUN yarn install --ignore-platform --ignore-optional && yarn build

# Prepare nginx
FROM nginx:1.19.3-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d

# Fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
