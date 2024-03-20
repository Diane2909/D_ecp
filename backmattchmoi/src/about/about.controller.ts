import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('about')
export class AboutController {
  @Get('json')
  getAboutJson(@Req() request: Request) {
    const clientIp = request.ip;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const services = [
      {
        name: 'weather',
        widgets: [
          {
            name: 'city_temperature',
            description: 'Display temperature for a city',
            params: [{ name: 'city', type: 'string' }],
          },
        ],
      },
      {
        name: 'Anime',
        widgets: [
          {
            name: 'Anime Quote',
            description: 'Display anime quote randomly',
            params: [
              { name: 'link', type: 'string' },
              { name: 'number', type: 'string' },
            ],
          },
        ],
      },
      {
        name: 'Dog',
        widgets: [
          {
            name: 'Dog pictures',
            description: 'Display dog pictures randomly',
            params: [
              { name: 'link', type: 'picture' },
              { name: 'number', type: 'integer' },
            ],
          },
        ],
      },
      {
        name: 'Egg-timer',
        widgets: [
          {
            name: 'Egg-Timer',
            description: 'Timer to cook your eggs',
            params: [{ name: 'duration', type: 'integer' }],
          },
        ],
      },
      {
        name: 'Emoji',
        widgets: [
          {
            name: 'Random Emoji',
            description: 'Display random Emoji',
            params: [],
          },
        ],
      },
      {
        name: 'Joke',
        widgets: [
          {
            name: 'joke',
            description: 'Display some Jokes randomly',
            params: [],
          },
        ],
      },
      {
        name: 'Pokemon',
        widgets: [
          {
            name: 'Pokemon',
            description: 'Display the sprite of the pokemon when you search',
            params: [{ name: 'pokemonId', type: 'integer' }],
          },
        ],
      },
      {
        name: 'Postit',
        widgets: [
          {
            name: 'Add a Postit',
            description: 'Write, add and display a Postit',
            params: [{ name: 'content', type: 'string' }],
          },
        ],
      },
    ];

    const aboutData = {
      customer: { host: clientIp },
      server: {
        current_time: currentTimestamp,
        services: services,
      },
    };

    return aboutData;
  }
}
