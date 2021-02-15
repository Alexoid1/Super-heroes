const HeroList = async () => {
  try {
    const heroes = await fetch(
      'https://akabab.github.io/superhero-api/api/all.json',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return heroes.json();
  } catch (error) {
    return error.json();
  }
};

it('Get the heroes from the Api', () => {
  HeroList()
    .then(response => {
      expect(response).toBe('Succeed');
    })
    .catch(error => error);
});

it('it should return the first hero of the hero list', () => {
  HeroList().then(data => {
    expect(data).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          name: 'A-Bomb',
          slug: '1-a-bomb',
          powerstats: {
            intelligence: 38,
            strength: 100,
            speed: 17,
            durability: 80,
            power: 24,
            combat: 64,
          },
          appearance: {
            gender: 'Male',
            race: 'Human',
            height: [
              "6'8",
              '203 cm',
            ],
            weight: [
              '980 lb',
              '441 kg',
            ],
            eyeColor: 'Yellow',
            hairColor: 'No Hair',
          },
          biography: {
            fullName: 'Richard Milhouse Jones',
            alterEgos: 'No alter egos found.',
            aliases: [
              'Rick Jones',
            ],
            placeOfBirth: 'Scarsdale, Arizona',
            firstAppearance: 'Hulk Vol 2 #2 (April, 2008) (as A-Bomb)',
            publisher: 'Marvel Comics',
            alignment: 'good',
          },
          work: {
            occupation: 'Musician, adventurer, author; formerly talk show host',
            base: '-',
          },
          connections: {
            groupAffiliation: 'Hulk Family; Excelsior (sponsor), Avengers (honorary member); formerly partner of the Hulk, Captain America and Captain Marvel; Teen Brigade; ally of Rom',
            relatives: 'Marlo Chandler-Jones (wife); Polly (aunt); Mrs. Chandler (mother-in-law); Keith Chandler, Ray Chandler, three unidentified others (brothers-in-law); unidentified father (deceased); Jackie Shorr (alleged mother; unconfirmed)',
          },
          images: {
            xs: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg',
            sm: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg',
            md: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg',
            lg: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg',
          },
        },
      ]),
    );
  }).catch(() => { });
});
