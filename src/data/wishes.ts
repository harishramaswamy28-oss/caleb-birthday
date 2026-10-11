/**
 * Birthday wishes for Caleb — 33 total (7 lettered a–g, 26 numbered 1–26).
 * Message text is copied from the latest supplied wishes document without rewriting.
 * Photos live in /public/images/Wishes/ and were supplied as p1…p33 in the
 * same order as the document: a→p1 … g→p7, 1→p8 … 26→p33
 * (p14 and p27 use the .jpg extension; all others .jpeg).
 */

export interface Wish {
  /** Stable unique id used by React and animations. */
  id: string;
  /** Sender name shown on the envelope and inside the opened wish. */
  from: string;
  /** Original wish text. */
  message: string;
  /** Verified path under /public, for example '/images/wishes/name.jpg'. */
  photoSrc?: string;
  /** Alt text for the matching photo. */
  photoAlt?: string;
}

export const WISHES: Wish[] = [
  {
    id: "wish-a",
    from: "Rebecca Princy Akka",
    message: `Happy Birthday, Caleb thambi!

There is something so beautiful about being known by JESUS. HE knows the parts of your story that no one else sees, understands the words your heart cannot express, and sees beyond what the world can ever see.

You don't have to explain yourself to HIM, pretend before HIM, or find the right words to be understood. HE simply knows you ...completely, personally, and lovingly.

As you celebrate another year, may this truth always remain close to your heart: the same JESUS who created you knows your name, understands your heart, and is present in every season of your life.

“I have called you by your name; You are Mine.” — Isaiah 43:1 (NKJV)

May you always find joy in knowing that you belong to HIM, peace in knowing that He understands you, and comfort in knowing that His presence is never far away.

Happy Birthday once again, Caleb Thambi! May you always know how precious it is to be known by the One who loves you beyond words.

With Love,
Rebecca Princy Akka.`,
    photoSrc: "/images/Wishes/p1.jpeg",
    photoAlt: "Photo shared by Rebecca Princy Akka for Caleb's birthday",
  },
  {
    id: "wish-b",
    from: "Grazy Akka",
    message: `Happy Birthday, Caleb thambi..
May God bless you abundantly and fill your life with endless happiness, peace, love, and success.
May His presence guide you in every step you take, protect you from every difficulty, and give you strength to overcome every challenge.
May the Lord fulfill the beautiful desires of your heart according to His perfect plan.
May you grow in wisdom, faith, and kindness, and may His grace and favor follow you all the days of your life. Always keep smiling and trusting in Him, because His plans for you are wonderful... May this year of life be filled with countless blessings and beautiful memories.. Stay blessed, Caleb thambi..
With Love,
Grazy Akka.`,
    photoSrc: "/images/Wishes/p2.jpeg",
    photoAlt: "Photo shared by Grazy Akka for Caleb's birthday",
  },
  {
    id: "wish-c",
    from: "Adam",
    message: `Happiest birthday Caleb Anna!!
In this new year, may God bless you with riches, blessings and much much more of good things for you mann... I'm so happy that I've got the bestest brother in Christ Jesus and I thank you so much for looking at me as your own. I will forever be grateful for this bond. Thanks for the lessons, the fun we had and the times we shared our everything. I'm glad to say that I've got the bestest brother in my life.
One again Happy birthday broo
Ippadikku Adam :))`,
    photoSrc: "/images/Wishes/p3.jpeg",
    photoAlt: "Photo shared by Adam for Caleb's birthday",
  },
  {
    id: "wish-d",
    from: "Alan",
    message: `🎉🎂 Happy Birthday, Caleb Anna! ❤️✨

May God bless you with abundant happiness, good health, endless peace, and success in everything you do. 🙏❤️ May His grace guide your steps, His love strengthen you, and His blessings follow you throughout your life. May this new year of your life be filled with beautiful moments, unforgettable memories, and countless reasons to smile. Keep shining and inspiring everyone around you! 🌟

Wishing you a blessed and wonderful birthday, Caleb Anna! 🎂🎁❤️

With love,
Alan ❤️✨`,
    photoSrc: "/images/Wishes/p4.jpeg",
    photoAlt: "Photo shared by Alan for Caleb's birthday",
  },
  {
    id: "wish-e",
    from: "Ethan",
    message: `Happy birthday daa
May God bless you and take you to greater heights for his glory
Thanks for being with me through my hardships and staying by my side when everyone turned against me
I'm forever grateful!!!
Have a blessed birthday
Love ya bro ❤️
-Ethan`,
    photoSrc: "/images/Wishes/p5.jpeg",
    photoAlt: "Photo shared by Ethan for Caleb's birthday",
  },
  {
    id: "wish-f",
    from: "Edna",
    message: `Happy birthday thambiii!!
U've been a rlly good brother thru the years
And now....
Ur actually turning 19!!
Like *19*
So ur actually a good person
Even though ur the dumbest and most annoying person on  the  world🌎...
I still love and trust you
Happy birthday Caleb😎😁🩷

-Edna`,
    photoSrc: "/images/Wishes/p6.jpeg",
    photoAlt: "Photo shared by Edna for Caleb's birthday",
  },
  {
    id: "wish-g",
    from: "Avantika",
    message: `Happy Birthdayyy Caleb! 🥳🎂 Wishing you lots of happiness, success and good vibes always. Stay as joyous as you are. Hope this year brings you lots of beautiful memories and everything you wish for! 🤍✨
-Avantika`,
    photoSrc: "/images/Wishes/p7.jpeg",
    photoAlt: "Photo shared by Avantika for Caleb's birthday",
  },
  {
    id: "wish-01",
    from: "Vijay Nishal",
    message: `Happy Birthday to my ID card stealer 😂😭❤️🎂 Hope you have the best day ever! Wishing you lots of happiness, success, and all the good things in life. Keep smiling and keep annoying others like you always do 😂🫶🏻 . Stay the same crazy person you are and make lots of beautiful memories this year. Happy Birthday once again! 🥳💗`,
    photoSrc: "/images/Wishes/p8.jpeg",
    photoAlt: "Photo shared by Vijay Nishal for Caleb's birthday",
  },
  {
    id: "wish-02",
    from: "Harish Kumar",
    message: `Happy birthday da Caleb 🥳🥳. Though you do all kinds of mischief with our friends, when it comes to any task, you tend to be more supportive and dedicated and encourage everyone around you to give their best, which is one thing that I admired you of.

After all these days of you 'surprising' us on our birthdays, we've tried to surprise you this time. May you enjoy your day to the fullest. 🎊

Wishing you sound health, happiness, and lots of success in everything (esp. in your Cybersecurity interests) you do in the years ahead! 🌟`,
    photoSrc: "/images/Wishes/p9.jpeg",
    photoAlt: "Photo shared by Harish Kumar for Caleb's birthday",
  },
  {
    id: "wish-03",
    from: "Pranesh",
    message: `Happy Birthday Caleb 🗿🎂🎂🥂🫂✨💥🔥I've seen you as a topper boy since high school, and also grinding S grades here in college . Keep grinding and All the best wishes for your life bro 🔥🔥. Happy 19! 🍾`,
    photoSrc: "/images/Wishes/p10.jpeg",
    photoAlt: "Photo shared by Pranesh for Caleb's birthday",
  },
  {
    id: "wish-04",
    from: "Trishant",
    message: `Happy birthday, future hacker! You're officially the most irritating person I know, right after my brothers. Even though you never pass up a chance to make fun of me, I still don't mind it because I know your intentions are pure underneath it all, and it's just your weird way of treating friends. Keep being the one who brings the good vibes and sets the funny mood in the group. And thanks, because of you, my stickers have reached different continents. I feel popular now.🥲`,
    photoSrc: "/images/Wishes/p11.jpeg",
    photoAlt: "Photo shared by Trishant for Caleb's birthday",
  },
  {
    id: "wish-05",
    from: "Roxy",
    message: `Happy birthday Caleb, I hope you reach greater heights in your career. Preserve your networking skills as it will take you to greater heights.`,
    photoSrc: "/images/Wishes/p12.jpeg",
    photoAlt: "Photo shared by Roxy for Caleb's birthday",
  },
  {
    id: "wish-06",
    from: "Archith",
    message: `Happy birthday da Caleb. Hope you have a great year ahead brother.`,
    photoSrc: "/images/Wishes/p13.jpeg",
    photoAlt: "Photo shared by Archith for Caleb's birthday",
  },
  {
    id: "wish-07",
    from: "Prithvi",
    message: `Happy birthday da caleb. The most hyperactive and naughty guy I've ever met. God may bless you with endless blessings 💖 Stay happy and enthusiastic as you are.`,
    photoSrc: "/images/Wishes/p14.jpg",
    photoAlt: "Photo shared by Prithvi for Caleb's birthday",
  },
  {
    id: "wish-08",
    from: "Adhithya A",
    message: `Many more happy returns of the day Caleb🎂🎂🎉🎉!`,
    photoSrc: "/images/Wishes/p15.jpeg",
    photoAlt: "Photo shared by Adhithya A for Caleb's birthday",
  },
  {
    id: "wish-09",
    from: "Shri Vishwa",
    message: `Happy birthday Caleb many more happy returns of the day!🎉🎂🎹✝️💙🥳🔥
Today is not just a celebration of your birth, but also a celebration of the wonderful person you are becoming. You are a guy with strength, courage, a strong moral mindset, and a heart that strives to stand for what is right. 💪❤️

One of the most beautiful things about you is your desire to become a Church Father and dedicate your life to serving God. ✝️🙏 That is not an ordinary dream; it takes faith, discipline, humility, wisdom, and a heart full of love. May God guide every step you take and give you the strength to overcome every challenge that comes your way. Remember, true greatness is not just about physical strength, but also about the strength to remain kind, humble, honest, and faithful when life tests you.

And of course, keep making beautiful music with your keyboard! 🎹🎶 May your fingers continue to create melodies that touch hearts and bring people closer to God. Let your music become a prayer, your words become a source of encouragement, and your actions become an example for others to follow.

Brother, may the Lord bless you with good health, wisdom, peace, happiness, and an unwavering faith. May He open the right doors for you, protect you from evil, and help you fulfil the purpose He has planned for your life. ❤️✨

Never stop growing, never compromise your values, and never forget the power of a good heart.

**Happy Birthday once again, Caleb! 🎂🔥**

May you grow stronger in body, wiser in mind, purer in heart, and deeper in faith every single year. Keep shining for Christ, brother! ✝️👑

**God bless you always! 🙌❤️**
(Don't bully others here after.
Poor Racksheetth crying in my dreams.)`,
    photoSrc: "/images/Wishes/p16.jpeg",
    photoAlt: "Photo shared by Shri Vishwa for Caleb's birthday",
  },
  {
    id: "wish-10",
    from: "Mohamed Nawaz",
    message: `Happy Birthday, Caleb! 🎂❤️ May God bless you with a bright future, endless happiness, good health, and success in everything you do. 🎉✨`,
    photoSrc: "/images/Wishes/p17.jpeg",
    photoAlt: "Photo shared by Mohamed Nawaz for Caleb's birthday",
  },
  {
    id: "wish-11",
    from: "Akshay",
    message: `Happiest Birthday, Da Elisha! The biggest sticker thief I know, who collects my photos (that too with my worst poses) like it's a full-time job. You're one of the most annoying people ever, but also one of my favourites. I'm genuinely glad to have you in my life, and I hope we stay this close for years to come. Wishing you lots of happiness, success, and everything you deserve. Have a wonderful year ahead.`,
    photoSrc: "/images/Wishes/p18.jpeg",
    photoAlt: "Photo shared by Akshay for Caleb's birthday",
  },
  {
    id: "wish-12",
    from: "Ishan",
    message: `Happy Birthday, Caleb! 🎂
I can't believe we are already in our 2nd year of college. Time is flying, but I'm so glad I have a solid buddy like you to navigate through all the chaotic lectures, crazy assignments, and endless exam stress. You always bring the best energy to our college days, and semesters are definitely a lot more fun with you around.
I hope your special day is packed with good vibes, great food, and plenty of celebrations. Here’s to surviving another year of classes together and making even better memories. Have an absolute blast, man! 🎉 Let's celebrate soon!`,
    photoSrc: "/images/Wishes/p19.jpeg",
    photoAlt: "Photo shared by Ishan for Caleb's birthday",
  },
  {
    id: "wish-13",
    from: "Derek",
    message: `Happy Birthday da Caleb! Wishing you a fantastic birthday filled with happiness, laughter, and unforgettable memories! May GOD open new doors for you and bring you endless opportunities, success, and good health. Have an absolutely wonderful birthday, Caleb! GOD bless!`,
    photoSrc: "/images/Wishes/p20.jpeg",
    photoAlt: "Photo shared by Derek for Caleb's birthday",
  },
  {
    id: "wish-14",
    from: "Dharsan",
    message: `🎉🎂 Happy Birthday, Caleb! 🥳❤️

Wishing you a fantastic birthday filled with happiness, laughter, love, and unforgettable memories! 🎁✨ May all your dreams come true, and may this new year of your life bring you success, good health, and endless reasons to smile. Keep shining, keep smiling, and enjoy your special day to the fullest! 🎊🔥

Happy Birthday once again, Caleb! ❤️🎂💫`,
    photoSrc: "/images/Wishes/p21.jpeg",
    photoAlt: "Photo shared by Dharsan for Caleb's birthday",
  },
  {
    id: "wish-15",
    from: "Kaushik",
    message: `Yo big Caleb happy birthday 🎂 have a blessed year ahead✨.`,
    photoSrc: "/images/Wishes/p22.jpeg",
    photoAlt: "Photo shared by Kaushik for Caleb's birthday",
  },
  {
    id: "wish-16",
    from: "Deepak",
    message: `Happy Birthday da Caleb Elisha Joseph! 🥳🎂❤️

Dei Caleb, nee oru periya Teddy Bear maari da! 🧸😂❤️ Unna paathale oru positive vibe varum. Eppovum sirichikittu, ellarayum sirikka vechikittu, jolly ah iruppa! ❤️

Nee ellarayum kalachitu, nakkal pannitu, vilayaditu irundhaalum, adhellam just fun ku mattum dhaan. Yaarayum hurt pannanum nu unakku oru naalum thonadhu. 🫂❤️

Unakku irukura andha nalla heart dhaan un biggest speciality da! ❤️ Un kooda irukura ellarum happy ah irukkanum nu ninaikkura oru genuine person nee.

Rakshith solra maari, nee unmaiyave oru big cute Teddy Bear dhaan! 🧸😂❤️

Indha maari un character ah eppovum maathikaadha da. Un life full ah happiness, success, love and beautiful memories niraiya irukkanum! ✨❤️

Once again Happy Birthday da Caleb! 🎂🥳❤️ Stay the same happy, funny and kind-hearted person forever! 🫂🧸❤️`,
    photoSrc: "/images/Wishes/p23.jpeg",
    photoAlt: "Photo shared by Deepak for Caleb's birthday",
  },
  {
    id: "wish-17",
    from: "Racksheetth",
    message: `Many more happy returns of the day, Caleb! 🎉🥳❤️
Never expected to have a friend, a mentor, AND a bodyguard like you 😂😭❤️ I genuinely can't even remember how we became this close, but I'm really glad we did!

You look rugged on the outside, but deep down, you have the heart of a child. 🥹❤️ You care for and love everyone around you in your own way. Tease, bully, ragebait 😂😭… and yet, somehow, everyone still loves youuuu! 😂❤️

I honestly don't even know what to say sometimes. First of all, thank you for being so open and genuine, for not having bad thoughts about others, for not being jealous, and for always being straightforward and saying things to people's faces. That's something I genuinely appreciate about you.

And honestly, you're one of my best Jesus gift to me. 🥹❤️✝️ I'm really thankful to God for bringing you into my life.

May Jesus bless you with a beautiful life filled with love, joy, peace, and purpose. May His grace guide you always, and His unfailing love surround you forever. ❤️✝️`,
    photoSrc: "/images/Wishes/p24.jpeg",
    photoAlt: "Photo shared by Racksheetth for Caleb's birthday",
  },
  {
    id: "wish-18",
    from: "Anina",
    message: `Dear Caleb the monkey 🐒,           you are one of the most precious person I have met ❤️🫶🏻 also sooo annoying 🙄 but it won't change the fact you are my best brother and you are my favourite teddy bear 🧸🎀🫶🏻😁 still so annoying 🙄 n naughty but I am damn sure you will always love me as a tiny baby sister 😁🫶🏻🥹💯 n I wish you the best 19th birthday ever`,
    photoSrc: "/images/Wishes/p25.jpeg",
    photoAlt: "Photo shared by Anina for Caleb's birthday",
  },
  {
    id: "wish-19",
    from: "Kavya",
    message: `Happyyy Birthday Calebbbb!! 🥳🤍

You irritate me more than you probably realise 😭 and our ideologies are literally so different that we can never agree on half the things 💀 but jokes apart, you're genuinely a good person, and I hope you know that. Despite our differences and all the times you get on my nerves, I do appreciate the person you are. 🫶🏻

I genuinely wish you all the happiness, success, and good things in life because you deserve them. Hope this year brings you lots of good memories and helps you become an even better version of yourself. Stay the same good person you are, but maybe try being a little less annoying 😭🙏🏻

Happy birthday once again, Caleb!! Have the best dayyy! 🥳✨`,
    photoSrc: "/images/Wishes/p26.jpeg",
    photoAlt: "Photo shared by Kavya for Caleb's birthday",
  },
  {
    id: "wish-20",
    from: "Vaishnavi",
    message: `Happyyy Birthday Calebbb!! 🥳🎂🎉

Wishing the professional ragebaiter, certified troublemaker, and one of the most jovial people on the bus a very happy birthdayyy 😂😭 Bro really wakes up every day and chooses to annoy people for fun, and somehow still manages to be a fun and caring person to be around 💀🤚🏻

Jokes apart, you're genuinely one of those people who can make an ordinary bus ride so much more entertaining with your random antics and chaotic energy. Never lose that fun-loving side of yours, and keep spreading laughter (even if half of it comes from irritating people on purpose 😭). Hope your second year of CSE Core treats you well, your plans work out, and you get plenty of reasons to smile this year!

May this new chapter bring you lots of happiness, success, good memories, and obviously more people to ragebait because apparently that's your life's mission 😂🙏🏻

Stay the same fun, caring, and effortlessly entertaining person you are. Have an amazing birthday, Calebbb na! Enjoy your day to the fullest! 🥳🎂✨`,
    photoSrc: "/images/Wishes/p27.jpg",
    photoAlt: "Photo shared by Vaishnavi for Caleb's birthday",
  },
  {
    id: "wish-21",
    from: "Navya",
    message: `Sooo happy birthday to the person who blinks his eyes when someone say hi rather than saying a hi back!! Yea obv it's Caleb n this is Navya wishing u a very happy birthday. The jokes made by u, we making jokes on u especially the bus time short meetups are some memories i would always cherish upon. Tbh epdi frnd aaninga edume therile unga kita oru seniornra oru feel eh varadu such a jovial guy u are!! And yeah wishing to always be jolly as always u r n seekrama get a job n get settled so tht we can spend on ur money... Jk but yea hbd once more enjoy ur day.`,
    photoSrc: "/images/Wishes/p28.jpeg",
    photoAlt: "Photo shared by Navya for Caleb's birthday",
  },
  {
    id: "wish-22",
    from: "Harish R",
    message: `Happy Birthday, Caleb Bro! May you achieve greater heights in life and also achieve your goals and desires. I pray for you and your family to live a healthy and prosperous life. The first time I came to know about you, you were portrayed like a gangster-like symbol. Maybe it's just because of your naughty behaviour, especially your art of stealing ID cards and cracking into others' mobiles. Gradually, I understood that beside these characteristics lies a pure soul who cares, protects and wishes just good things for others. Even though you annoy everyone, you always respected others, supported them during their tough times and differentiated good and bad for us, which made me wonder about the beauty of life itself, and I really want to thank you for that, bro!

Once again, happy birthday, Caleb Bro!`,
    photoSrc: "/images/Wishes/p29.jpeg",
    photoAlt: "Photo shared by Harish R for Caleb's birthday",
  },
  {
    id: "wish-23",
    from: "Vamshi",
    message: `Happy Birthday Caleb! 🎉🥳 Wishing you a wonderful birthday and an amazing year ahead! Hope your day is filled with happiness, laughter, and lots of good moments. May this new year of your life bring you success in everything you do, new opportunities, and plenty of reasons to smile. Hope you have a great time today and enjoy every moment of your special day. Stay happy, keep doing your best, and may everything you’re looking forward to work out well. Have a fantastic birthday and an even better year ahead! Once again, wishing you a very happy birthday! 🎂✨`,
    photoSrc: "/images/Wishes/p30.jpeg",
    photoAlt: "Photo shared by Vamshi for Caleb's birthday",
  },
  {
    id: "wish-24",
    from: "Narasimhan",
    message: `🎉🎂 Happy Birthday, Caleb! 🥳❤️

Wishing you a fantastic birthday filled with happiness, laughter, love, and unforgettable memories! 🎁✨ I’m really glad to have a friend like you, and I hope this new chapter of your life brings you endless opportunities, success, and all the happiness you deserve. May you achieve every goal you dream of, overcome every challenge with confidence, and keep smiling no matter what life throws your way. 🤍 Keep being the amazing person you are, and never stop chasing your dreams! Enjoy your special day to the fullest, make incredible memories, and have an absolutely legendary year ahead!and one more  thing in the end Once again, Happy Birthday, Caleb! 🎂🔥💯`,
    photoSrc: "/images/Wishes/p31.jpeg",
    photoAlt: "Photo shared by Narasimhan for Caleb's birthday",
  },
  {
    id: "wish-25",
    from: "Skanthan",
    message: `🎉🎂 **HAPPY BIRTHDAY, CALEB!** 🥳🎈🔥

Hope you have an absolutely amazing day filled with fun, laughter, good vibes, and unforgettable memories! 😎✨ Wishing you a year full of exciting adventures, big wins, new opportunities, and countless reasons to celebrate! 🚀🏆💫 May everything you’re working towards turn out great, and may this year bring you some of your best moments yet! 🙌🏻🌟 Keep smiling, keep being yourself, and keep making life awesome! 🤜🏻🤛🏻💯 Enjoy your special day to the fullest, eat lots of cake 🍰😂, have the best time, and make some legendary memories! 🎊🎁🎇 Here's to another year of happiness, success, and great experiences! 🥂🔥

**Once again, Happiest Birthday, Caleb!** 🎂🥳🎉❤️‍🔥 Have a blast! 💥🎈✨`,
    photoSrc: "/images/Wishes/p32.jpeg",
    photoAlt: "Photo shared by Skanthan for Caleb's birthday",
  },
  {
    id: "wish-26",
    from: "Vishnu",
    message: `🎉 Happy Birthday, Caleb! 🥳🎂❤️

Wishing you a fantastic birthday filled with happiness, laughter, love, and unforgettable memories! 🫂✨ May this new year of your life bring you endless opportunities, success in everything you do, and the strength to overcome every challenge. 💯🔥 I hope all your dreams come true and that you always have reasons to smile. 😊💫 Keep being the amazing person you are, and never stop chasing your goals. May our friendship continue to grow stronger with more fun, crazy moments, and beautiful memories ahead! 🥂🎁 Enjoy your special day to the fullest, Caleb! ❤️🎉`,
    photoSrc: "/images/Wishes/p33.jpeg",
    photoAlt: "Photo shared by Vishnu for Caleb's birthday",
  },







];
