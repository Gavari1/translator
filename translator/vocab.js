/*
  vocab.js
  --------
  This file is for vocabulary and phrase traps only.
  Format inside BASE_VOCAB_TEXT:
    english = elefen
    english = elefen | noun
    english = elefen | adj
    english = elefen | det
    english = elefen | adv

  Keep grammar commands in rules.js.
*/

const BASE_VOCAB_TEXT = `
# =========================================================
# BASIC WORDS
# =========================================================
hello = alo
friend = ami | noun

# pronouns
i = me
me = me
you = tu
he = el
him = el
she = el
her = el
it = lo
we = nos
us = nos
they = los
them = los
you all = vos

# tense / modality helpers
would = ta
would not = no ta
wouldn't = no ta
does not = no
doesn't = no

# determiners
a = un | det
an = un | det
the = la | det
this = esta | det
my = mea | det
mine = mea
your = tua | det
yours = tua
his = sua | det
her own = sua
hers = sua
our = nosa | det
ours = nosa
their = lor | det
theirs = lor

# common nouns
good morning = bon dia
car = auto | noun
house = casa | noun
thing = cosa | noun
language = lingua | noun
person = person | noun
river = rio | noun
train = tren | noun
bus = autobus | noun
bicycle = bisicle | noun
bike = bisicle | noun
plane = avion | noun
boat = barco | noun
food = comeda | noun
water = acua | noun
day = dia | noun
night = note | noun
work = labora | noun
job = labora | noun
street = strada | noun
store = boteca | noun
school = scola | noun
city = site | noun
country = pais | noun
world = mundo | noun
word = parola | noun
sentence = frase | noun
time = tempo | noun
year = anio | noun
month = mense | noun
week = semana | noun
hour = ora | noun
minute = minuta | noun
morning = matin | noun
church = eglesa | noun
evening = sera | noun
room = sala | noun
door = porte | noun
window = fenestra | noun
book = libro | noun
phone = telefono | noun
name = nom | noun
family = familia | noun
mother = madre | noun
father = padre | noun
child = enfante | noun
baby = bebe | noun
woman = fem | noun
man = om | noun
people = persones | noun
body = corpo | noun
head = testa | noun
hand = mano | noun
eye = ojo | noun
mouth = boca | noun
heart = cor | noun
coffee = cafe | noun
bread = pan | noun
fruit = fruta | noun
animal = animal | noun
dog = can | noun
cat = gato | noun
tree = arbor | noun
flower = flor | noun
sun = sol | noun
moon = luna | noun
place = loco | noun
problem = problem | noun
cage = caje | noun
home = casa | noun
thing = cosa | noun
things = cosas | noun
# =========================================================
# COMMON NOUNS (ADDITIONAL)
# =========================================================
table = table | noun
chair = seja | noun
bed = leto | noun
wall = mur | noun
floor = solo | noun
ceiling = plafon | noun
picture = piture | noun
paper = paper | noun
pencil = lapis | noun
pen = pen | noun
computer = computador | noun
letter = letera | noun
music = musica | noun
song = canta | noun
clothes = vestes | noun
shirt = camisa | noun
pants = pantalon | noun
shoe = sapato | noun
hat = xapo | noun
bag = saco | noun
brush = brosa | noun
soap = sapon | noun
sponge = spongo | noun
towel = tualia | noun
mirror = miror | noun
engine = motor | noun
oil = olio | noun
wheel = rota | noun
key = clave | noun
lock = serur | noun
box = caxa | noun
cube = cubo | noun
game = jua | noun
ball = bal | noun
brother = frate | noun
sister = sore | noun
friend = ami | noun
money = mone | noun
price = preso | noun
color = color | noun
art = arte | noun
blood = sangue | noun
bone = oso | noun
fire = foco | noun
earth = tera | noun
wind = vento | noun
sky = sielo | noun
sea = mar | noun
mountain = monte | noun
island = isola | noun


# =========================================================
# ADVERBS - MANNER / HOW
# =========================================================
well = bon | adv
badly = mal | adv
quickly = rapida | adv
slowly = lenta | adv
clearly = clar | adv
correctly = coreta | adv
wrongly = falsa | adv
truly = vera | adv
falsely = falsa | adv
directly = direta | adv
simply = simple | adv
logically = lojical | adv
naturally = natural | adv
personally = personal | adv
publicly = publica | adv
privately = privada | adv
locally = local | adv
commonly = comun | adv
differently = diferente | adv
safely = secur | adv
dangerously = perilosa | adv
strongly = forte | adv
weakly = debil | adv
softly = suave | adv
loudly = forte | adv
quietly = silente | adv
beautifully = bela | adv
honestly = onesta | adv
curiously = curiosa | adv
comfortably = comfortosa | adv
uncomfortably = noncomfortosa | adv
happily = felis | adv
sadly = triste | adv
angrily = coler | adv
carefully = cauta | adv
easily = fasil | adv
strangely = strana | adv
specially = spesial | adv
usefully = usosa | adv

# =========================================================
# ADVERBS - TIME
# =========================================================
currently = corente | adv
recently = resente | adv
finally = final | adv
initially = inial | adv
eventually = eventual | adv
immediately = imediata | adv
suddenly = subita | adv
temporarily = temporaria | adv
permanently = permanente | adv
early = temprana | adv
daily = dial | adv
weekly = semanal | adv
monthly = mensal | adv
yearly = anual | adv

# =========================================================
# ADVERBS - FREQUENCY
# =========================================================
usually = usual | adv
frequently = frecuente | adv
rarely = rara | adv
constantly = constante | adv
regularly = regular | adv
normally = normal | adv
daily = dial | adv
weekly = semanal | adv
monthly = mensal | adv
yearly = anual | adv

# =========================================================
# ADVERBS - DEGREE / AMOUNT
# =========================================================
completely = completa | adv
totally = total | adv
partly = partal | adv
mostly = per la plu parte | adv
especially = spesial | adv
exactly = esata | adv
approximately = aproximada | adv
barely = apena | adv
really = real | adv
truly = vera | adv
fully = plen | adv
halfway = a media | adv

# =========================================================
# ADVERBS - PLACE / DIRECTION
# =========================================================
outside = estra | adv
inside = interna | adv
nearby = prosima | adv
far away = distante | adv
forward = a fronte | adv
backward = a retro | adv
upward = a supra | adv
downward = a infra | adv
together = junta | adv
apart = separada | adv
separately = separada | adv

# =========================================================
# ADVERBS - OPINION / CERTAINTY
# =========================================================
certainly = serta | adv
surely = serta | adv
possibly = posible | adv
impossibly = nonposible | adv
clearly = clar | adv
obviously = evidente | adv
apparently = aparente | adv
probably = probable | adv
maybe = forsan | adv

# =========================================================
# ADVERBS - COMPARISON / STYLE
# =========================================================
better = plu bon | adv
worse = plu mal | adv
best = la plu bon | adv
worst = la plu mal | adv
more clearly = plu clar | adv
less clearly = min clar | adv
more slowly = plu lenta | adv
less slowly = min lenta | adv
more quickly = plu rapida | adv
less quickly = min rapida | adv

# =========================================================
# PREPOSITIONS / LOCATION / MOVEMENT
# =========================================================
in = en
inside = en
on = sur
with = con
without = sin
for = per
to = a
than = ca 
from = de
at = a
about = sur 
near = prosima
beside = a lado de
next to = a lado de
by car = par auto
by train = par tren
by bus = par autobus
by bicycle = par bisicle
by bike = par bisicle
by plane = par avion
by boat = par barco
by the river = a lado de la rio
near the river = prosima a la rio
next to the river = a lado de la rio
by the house = a lado de la casa
near the house = prosima a la casa
next to the house = a lado de la casa
by my house = a lado de mea casa
near my house = prosima a mea casa
by your house = a lado de tua casa
near your house = prosima a tua casa
in my car = en mea auto
in your car = en tua auto
in his car = en sua auto
in her car = en sua auto
in our car = en nosa auto
in their car = en lor auto
to my house = a mea casa
to your house = a tua casa
to his house = a sua casa
to her house = a sua casa
to our house = a nosa casa
to their house = a lor casa
to the house = a la casa
to work = a la labora
to school = a la scola
to the store = a la boteca
to me = a me
to you = a tu
to him = a el
to her = a el
to us = a nos
to them = a los
to you all = a vos
will = ia 
would = ta 

# =========================================================
# THINK THAT / BELIEVE THAT / KNOW THAT

# =========================================================
i think that = me pensa ce
i thought that = me ia pensa ce
i will think that = me va pensa ce
you think that = tu pensa ce
you thought that = tu ia pensa ce
you will think that = tu va pensa ce
he thinks that = el pensa ce
he thought that = el ia pensa ce
he will think that = el va pensa ce
she thinks that = el pensa ce
she thought that = el ia pensa ce
she will think that = el va pensa ce
we think that = nos pensa ce
we thought that = nos ia pensa ce
we will think that = nos va pensa ce
they think that = los pensa ce
they thought that = los ia pensa ce
they will think that = los va pensa ce
you all think that = vos pensa ce
you all thought that = vos ia pensa ce
you all will think that = vos va pensa ce
thinks that = pensa ce 
though that = ia pensa ca
will think that = va pensa ce
thought = ia pensa 
thought that = ia pensa ce 
think that = pensa ce 
think = pensa 
thinks = pensa
will think = va pensa 

i believe that = me crede ce
i believed that = me ia crede ce
i will believe that = me va crede ce
you believe that = tu crede ce
you believed that = tu ia crede ce
you will believe that = tu va crede ce
he believes that = el crede ce
he believed that = el ia crede ce
he will believe that = el va crede ce
she believes that = el crede ce
she believed that = el ia crede ce
she will believe that = el va crede ce
we believe that = nos crede ce
we believed that = nos ia crede ce
we will believe that = nos va crede ce
they believe that = los crede ce
they believed that = los ia crede ce
they will believe that = los va crede ce
you all believe that = vos crede ce
you all believed that = vos ia crede ce
you all will believe that = vos va crede ce

i know that = me sabe ce
i knew that = me ia sabe ce
i will know that = me va sabe ce
you know that = tu sabe ce
you knew that = tu ia sabe ce
you will know that = tu va sabe ce
he knows that = el sabe ce
he knew that = el ia sabe ce
he will know that = el va sabe ce
she knows that = el sabe ce
she knew that = el ia sabe ce
she will know that = el va sabe ce
we know that = nos sabe ce
we knew that = nos ia sabe ce
we will know that = nos va sabe ce
they know that = los sabe ce
they knew that = los ia sabe ce
they will know that = los va sabe ce
you all know that = vos sabe ce
you all knew that = vos ia sabe ce
you all will know that = vos va sabe ce
know that = sabe ce 

# =========================================================
# WANT TO / WANT SOMEONE TO
# =========================================================
want = vole
wanted = ia vole
will want = va vole
would want = ta vole
want to = vole
wanted to = ia vole
will want to = va vole
would want to = ta vole
want me to = vole ce me 
wanted me to = ia vole ce me
will want me to = va vole ce me
want you to = vole ce tu
will want you to = va vole ce tu
wanted you to = ia vole ce tu 
would want you to = ta vole ce tu
want her to = vole ce el
will want her to = va vole ce el
wanted her to = ia vole ce el 
would want her to = ta vole ce el
want him to = vole ce el
will want him to = va vole ce el
wanted him to = ia vole ce el 
would want him to = ta vole ce el
want us to = vole ce nos
will want us to = va vole ce nos
wanted us to = ia vole ce nos 
would want us to = ta vole ce nos
want them to = vole ce los
will want them to = va vole ce los
wanted them to = ia vole ce los
would want them to = ta vole ce los
want you all to = vole ce vos
will want you all to = va vole ce vos
wanted you all to = ia vole ce vos
would want you all to = ta vole ce vos

# =========================================================
# CAN / COULD / SHOULD / MUST / HAVE TO
# =========================================================
can = pote
could = ta pote
should = debe
must = debe
have to = debe
has to = debe
had to = ia debe
will have to = va debe
would have to = ta debe
able to = pote
was able to = ia pote
were able to = ia pote
will be able to = va pote

# =========================================================
# BEFORE / AFTER + CLAUSE
# =========================================================
before i = ante ce me
before you = ante ce tu
before he = ante ce el
before she = ante ce el
before we = ante ce nos
before they = ante ce los
before you all = ante ce vos
after i = pos ce me
after you = pos ce tu
after he = pos ce el
after she = pos ce el
after we = pos ce nos
after they = pos ce los
after you all = pos ce vos

# =========================================================
# DO THAT / DO IT
# =========================================================
do that = fa acel
do it = fa lo
do = fa
did = ia fa
will do = va fa
would do = ta fa 
can do that = pote fa acel
could do that = ta pote fa acel
will do that = va fa acel
would do that = ta fa acel
we can do that = nos pote fa acel
we could do that = nos ta pote fa acel
we will do that = nos va fa acel
we would do that = nos ta fa acel
i can do that = me pote fa acel
you can do that = tu pote fa acel
he can do that = el pote fa acel
she can do that = el pote fa acel
they can do that = los pote fa acel
you all can do that = vos pote fa acel

# =========================================================
# TELL
# =========================================================
tell me = dise a me
tell you = dise a tu
tell him = dise a el
tell her = dise a el
tell us = dise a nos
tell them = dise a los
tell you all = dise a vos
told me = ia dise a me
told you = ia dise a tu
told him = ia dise a el
told her = ia dise a el
told us = ia dise a nos
told them = ia dise a los
told you all = ia dise a vos
will tell me = va dise a me
will tell you = va dise a tu
will tell him = va dise a el
will tell her = va dise a el
will tell us = va dise a nos
will tell them = va dise a los
will tell you all = va dise a vos
have to tell me = debe dise a me
have to tell you = debe dise a tu
have to tell him = debe dise a el
have to tell her = debe dise a el
have to tell us = debe dise a nos
have to tell them = debe dise a los
have to tell you all = debe dise a vos

# NEED
need = nesesa | verb
needs = nesesa | verb
needed = ia nesesa
needing = nesesante
to need = nesesa
will need = va nesesa
would need = ta nesesa
going to need = va nesesa
am going to need = va nesesa
is going to need = va nesesa
are going to need = va nesesa
was needing = ia nesesa
were needing = ia nesesa
will be needing = va nesesa
would be needing = ta nesesa

# NEED progressive phrase traps
i am needing = me nesesa
you are needing = tu nesesa
he is needing = el nesesa
she is needing = el nesesa
it is needing = lo nesesa
we are needing = nos nesesa
they are needing = los nesesa
you all are needing = vos nesesa

i was needing = me ia nesesa
you were needing = tu ia nesesa
he was needing = el ia nesesa
she was needing = el ia nesesa
it was needing = lo ia nesesa
we were needing = nos ia nesesa
they were needing = los ia nesesa
you all were needing = vos ia nesesa

i will be needing = me va nesesa
you will be needing = tu va nesesa
he will be needing = el va nesesa
she will be needing = el va nesesa
it will be needing = lo va nesesa
we will be needing = nos va nesesa
they will be needing = los va nesesa
you all will be needing = vos va nesesa

# NEED someone to - PRESENT

i need myself to = me nesesa ce me
i need you to = me nesesa ce tu
i need him to = me nesesa ce el
i need her to = me nesesa ce el
i need it to = me nesesa ce lo
i need us to = me nesesa ce nos
i need them to = me nesesa ce los
i need you all to = me nesesa ce vos
need you to = nesesa ce tu
need him to = nesesa ce el 
need her to = nesesa ce el 
need them to = nesesa ce los
needs me to = nesesa ce me 
needs you to = nesesa ce tu
needs her to = nesesa ce el
needs him to = nesesa ce el
needs them to = nesesa ce los
needs us to = nesesa ce nos
need us to = nesesa ce nos 

you need me to = tu nesesa ce me
you need yourself to = tu nesesa ce tu
you need him to = tu nesesa ce el
you need her to = tu nesesa ce el
you need it to = tu nesesa ce lo
you need us to = tu nesesa ce nos
you need them to = tu nesesa ce los
you need you all to = tu nesesa ce vos

he needs me to = el nesesa ce me
he needs you to = el nesesa ce tu
he needs himself to = el nesesa ce el
he needs her to = el nesesa ce el
he needs it to = el nesesa ce lo
he needs us to = el nesesa ce nos
he needs them to = el nesesa ce los
he needs you all to = el nesesa ce vos

she needs me to = el nesesa ce me
she needs you to = el nesesa ce tu
she needs him to = el nesesa ce el
she needs herself to = el nesesa ce el
she needs it to = el nesesa ce lo
she needs us to = el nesesa ce nos
she needs them to = el nesesa ce los
she needs you all to = el nesesa ce vos

it needs me to = lo nesesa ce me
it needs you to = lo nesesa ce tu
it needs him to = lo nesesa ce el
it needs her to = lo nesesa ce el
it needs itself to = lo nesesa ce lo
it needs us to = lo nesesa ce nos
it needs them to = lo nesesa ce los
it needs you all to = lo nesesa ce vos

we need me to = nos nesesa ce me
we need you to = nos nesesa ce tu
we need him to = nos nesesa ce el
we need her to = nos nesesa ce el
we need it to = nos nesesa ce lo
we need ourselves to = nos nesesa ce nos
we need them to = nos nesesa ce los
we need you all to = nos nesesa ce vos

they need me to = los nesesa ce me
they need you to = los nesesa ce tu
they need him to = los nesesa ce el
they need her to = los nesesa ce el
they need it to = los nesesa ce lo
they need us to = los nesesa ce nos
they need themselves to = los nesesa ce los
they need you all to = los nesesa ce vos

you all need me to = vos nesesa ce me
you all need you to = vos nesesa ce tu
you all need him to = vos nesesa ce el
you all need her to = vos nesesa ce el
you all need it to = vos nesesa ce lo
you all need us to = vos nesesa ce nos
you all need them to = vos nesesa ce los
you all need yourselves to = vos nesesa ce vos

# NEED someone to - PAST

i needed myself to = me ia nesesa ce me
i needed you to = me ia nesesa ce tu
i needed him to = me ia nesesa ce el
i needed her to = me ia nesesa ce el
i needed it to = me ia nesesa ce lo
i needed us to = me ia nesesa ce nos
i needed them to = me ia nesesa ce los
i needed you all to = me ia nesesa ce vos

needed myself to = me ia nesesa ce me
needed you to = me ia nesesa ce tu
needed him to = me ia nesesa ce el
needed her to = me ia nesesa ce el
needed it to = me ia nesesa ce lo
needed us to = me ia nesesa ce nos
needed them to = me ia nesesa ce los
needed you all to = me ia nesesa ce vos

you needed me to = tu ia nesesa ce me
you needed yourself to = tu ia nesesa ce tu
you needed him to = tu ia nesesa ce el
you needed her to = tu ia nesesa ce el
you needed it to = tu ia nesesa ce lo
you needed us to = tu ia nesesa ce nos
you needed them to = tu ia nesesa ce los
you needed you all to = tu ia nesesa ce vos

he needed me to = el ia nesesa ce me
he needed you to = el ia nesesa ce tu
he needed himself to = el ia nesesa ce el
he needed her to = el ia nesesa ce el
he needed it to = el ia nesesa ce lo
he needed us to = el ia nesesa ce nos
he needed them to = el ia nesesa ce los
he needed you all to = el ia nesesa ce vos

she needed me to = el ia nesesa ce me
she needed you to = el ia nesesa ce tu
she needed him to = el ia nesesa ce el
she needed herself to = el ia nesesa ce el
she needed it to = el ia nesesa ce lo
she needed us to = el ia nesesa ce nos
she needed them to = el ia nesesa ce los
she needed you all to = el ia nesesa ce vos

it needed me to = lo ia nesesa ce me
it needed you to = lo ia nesesa ce tu
it needed him to = lo ia nesesa ce el
it needed her to = lo ia nesesa ce el
it needed itself to = lo ia nesesa ce lo
it needed us to = lo ia nesesa ce nos
it needed them to = lo ia nesesa ce los
it needed you all to = lo ia nesesa ce vos

we needed me to = nos ia nesesa ce me
we needed you to = nos ia nesesa ce tu
we needed him to = nos ia nesesa ce el
we needed her to = nos ia nesesa ce el
we needed it to = nos ia nesesa ce lo
we needed ourselves to = nos ia nesesa ce nos
we needed them to = nos ia nesesa ce los
we needed you all to = nos ia nesesa ce vos

they needed me to = los ia nesesa ce me
they needed you to = los ia nesesa ce tu
they needed him to = los ia nesesa ce el
they needed her to = los ia nesesa ce el
they needed it to = los ia nesesa ce lo
they needed us to = los ia nesesa ce nos
they needed themselves to = los ia nesesa ce los
they needed you all to = los ia nesesa ce vos

you all needed me to = vos ia nesesa ce me
you all needed you to = vos ia nesesa ce tu
you all needed him to = vos ia nesesa ce el
you all needed her to = vos ia nesesa ce el
you all needed it to = vos ia nesesa ce lo
you all needed us to = vos ia nesesa ce nos
you all needed them to = vos ia nesesa ce los
you all needed yourselves to = vos ia nesesa ce vos

# NEED someone to - FUTURE

i will need myself to = me va nesesa ce me
i will need you to = me va nesesa ce tu
i will need him to = me va nesesa ce el
i will need her to = me va nesesa ce el
i will need it to = me va nesesa ce lo
i will need us to = me va nesesa ce nos
i will need them to = me va nesesa ce los
i will need you all to = me va nesesa ce vos

will need myself to = me va nesesa ce me
will need you to = me va nesesa ce tu
will need him to = me va nesesa ce el
will need her to = me va nesesa ce el
will need it to = me va nesesa ce lo
will need us to = me va nesesa ce nos
will need them to = me va nesesa ce los
will need you all to = me va nesesa ce vos

you will need me to = tu va nesesa ce me
you will need yourself to = tu va nesesa ce tu
you will need him to = tu va nesesa ce el
you will need her to = tu va nesesa ce el
you will need it to = tu va nesesa ce lo
you will need us to = tu va nesesa ce nos
you will need them to = tu va nesesa ce los
you will need you all to = tu va nesesa ce vos

he will need me to = el va nesesa ce me
he will need you to = el va nesesa ce tu
he will need himself to = el va nesesa ce el
he will need her to = el va nesesa ce el
he will need it to = el va nesesa ce lo
he will need us to = el va nesesa ce nos
he will need them to = el va nesesa ce los
he will need you all to = el va nesesa ce vos

she will need me to = el va nesesa ce me
she will need you to = el va nesesa ce tu
she will need him to = el va nesesa ce el
she will need herself to = el va nesesa ce el
she will need it to = el va nesesa ce lo
she will need us to = el va nesesa ce nos
she will need them to = el va nesesa ce los
she will need you all to = el va nesesa ce vos

it will need me to = lo va nesesa ce me
it will need you to = lo va nesesa ce tu
it will need him to = lo va nesesa ce el
it will need her to = lo va nesesa ce el
it will need itself to = lo va nesesa ce lo
it will need us to = lo va nesesa ce nos
it will need them to = lo va nesesa ce los
it will need you all to = lo va nesesa ce vos

we will need me to = nos va nesesa ce me
we will need you to = nos va nesesa ce tu
we will need him to = nos va nesesa ce el
we will need her to = nos va nesesa ce el
we will need it to = nos va nesesa ce lo
we will need ourselves to = nos va nesesa ce nos
we will need them to = nos va nesesa ce los
we will need you all to = nos va nesesa ce vos

they will need me to = los va nesesa ce me
they will need you to = los va nesesa ce tu
they will need him to = los va nesesa ce el
they will need her to = los va nesesa ce el
they will need it to = los va nesesa ce lo
they will need us to = los va nesesa ce nos
they will need themselves to = los va nesesa ce los
they will need you all to = los va nesesa ce vos

you all will need me to = vos va nesesa ce me
you all will need you to = vos va nesesa ce tu
you all will need him to = vos va nesesa ce el
you all will need her to = vos va nesesa ce el
you all will need it to = vos va nesesa ce lo
you all will need us to = vos va nesesa ce nos
you all will need them to = vos va nesesa ce los
you all will need yourselves to = vos va nesesa ce vos

# NEED someone to - CONDITIONAL

i would need myself to = me ta nesesa ce me
i would need you to = me ta nesesa ce tu
i would need him to = me ta nesesa ce el
i would need her to = me ta nesesa ce el
i would need it to = me ta nesesa ce lo
i would need us to = me ta nesesa ce nos
i would need them to = me ta nesesa ce los
i would need you all to = me ta nesesa ce vos

would need myself to = me ta nesesa ce me
would need you to = me ta nesesa ce tu
would need him to = me ta nesesa ce el
would need her to = me ta nesesa ce el
would need it to = me ta nesesa ce lo
would need us to = me ta nesesa ce nos
would need them to = me ta nesesa ce los
would need you all to = me ta nesesa ce vos

you would need me to = tu ta nesesa ce me
you would need yourself to = tu ta nesesa ce tu
you would need him to = tu ta nesesa ce el
you would need her to = tu ta nesesa ce el
you would need it to = tu ta nesesa ce lo
you would need us to = tu ta nesesa ce nos
you would need them to = tu ta nesesa ce los
you would need you all to = tu ta nesesa ce vos

he would need me to = el ta nesesa ce me
he would need you to = el ta nesesa ce tu
he would need himself to = el ta nesesa ce el
he would need her to = el ta nesesa ce el
he would need it to = el ta nesesa ce lo
he would need us to = el ta nesesa ce nos
he would need them to = el ta nesesa ce los
he would need you all to = el ta nesesa ce vos

she would need me to = el ta nesesa ce me
she would need you to = el ta nesesa ce tu
she would need him to = el ta nesesa ce el
she would need herself to = el ta nesesa ce el
she would need it to = el ta nesesa ce lo
she would need us to = el ta nesesa ce nos
she would need them to = el ta nesesa ce los
she would need you all to = el ta nesesa ce vos

it would need me to = lo ta nesesa ce me
it would need you to = lo ta nesesa ce tu
it would need him to = lo ta nesesa ce el
it would need her to = lo ta nesesa ce el
it would need itself to = lo ta nesesa ce lo
it would need us to = lo ta nesesa ce nos
it would need them to = lo ta nesesa ce los
it would need you all to = lo ta nesesa ce vos

we would need me to = nos ta nesesa ce me
we would need you to = nos ta nesesa ce tu
we would need him to = nos ta nesesa ce el
we would need her to = nos ta nesesa ce el
we would need it to = nos ta nesesa ce lo
we would need ourselves to = nos ta nesesa ce nos
we would need them to = nos ta nesesa ce los
we would need you all to = nos ta nesesa ce vos

they would need me to = los ta nesesa ce me
they would need you to = los ta nesesa ce tu
they would need him to = los ta nesesa ce el
they would need her to = los ta nesesa ce el
they would need it to = los ta nesesa ce lo
they would need us to = los ta nesesa ce nos
they would need themselves to = los ta nesesa ce los
they would need you all to = los ta nesesa ce vos

you all would need me to = vos ta nesesa ce me
you all would need you to = vos ta nesesa ce tu
you all would need him to = vos ta nesesa ce el
you all would need her to = vos ta nesesa ce el
you all would need it to = vos ta nesesa ce lo
you all would need us to = vos ta nesesa ce nos
you all would need them to = vos ta nesesa ce los
you all would need yourselves to = vos ta nesesa ce vos

# COMENSA
start = comensa | verb
starts = comensa | verb
started = ia comensa
starting = comensante
to start = comensa
will start = va comensa
would start = ta comensa

begin = comensa | verb
begins = comensa | verb
began = ia comensa
beginning = comensante
to begin = comensa
will begin = va comensa
would begin = ta comensa


# =========================================================
# IF / BECAUSE / WHEN / WHERE / QUESTIONS
# =========================================================
if = si
because = car
when = cuando
where = do
why = perce
what = cua
# that is handled by rules.js
acel = acel
ce = ce
cual = cual 
ci = ci
if i = si me
if you = si tu
if he = si el
if she = si el
if we = si nos
if they = si los
if you all = si vos
when i = cuando me
when you = cuando tu
when he = cuando el
when she = cuando el
when we = cuando nos
when they = cuando los
when you all = cuando vos
where i = do me
where you = do tu
where he = do el
where she = do el
where we = do nos
where they = do los
where you all = do vos
because i = car me
because you = car tu
because he = car el
because she = car el
because we = car nos
because they = car los
because you all = car vos

# =========================================================
# BE / HAVE / CONDITIONALS
# =========================================================
be = es
am = es
is = es
are = es
was = ia es
were = ia es
will be = va es
would be = ta es
to be = es
have = ave
has = ave
had = ia ave
will have = va ave
would have = ta ave
to have = ave
if i had = si me ta ave
if you had = si tu ta ave
if he had = si el ta ave
if she had = si el ta ave
if we had = si nos ta ave
if they had = si los ta ave
if you all had = si vos ta ave
if i were = si me ta es
if you were = si tu ta es
if he were = si el ta es
if she were = si el ta es
if we were = si nos ta es
if they were = si los ta es
if you all were = si vos ta es

# =========================================================
# COMMON VERBS
# =========================================================
to become = deveni
become = deveni
do = fa
make = fa
to do = fa
to make = fa
go = vade
goes = vade
is going to the = vade a la
am going to the = vade a la
are going to the = vade a la
are you going to = esce tu vade 
is she going to = esce el vade 
is he going to = esce el vade
are we going to = esce nos vade 
are they going to = esce los vade
are you all going to = esce vos vade
is going to = va
am going to = va
are going to = va
was going to the = ia vade a la
was going to = ia intende
going = vadente
went = ia vade
went to = ia vade a
will go = va vade 
will go to = ta vade a 
would go = ta vade
would go to = ta vade a la
to go = vade
come = veni
am coming = veni
comes = veni
came = ia veni
coming = veninte
will come = va veni
would come = ta veni
to come = veni
return = reveni
come back = reveni
leave = parti
depart = parti
enter = entra
exit = sorti
fall = cade
fly = vola
follow = segue
jump = salta
run = core
sit = senta
stand = sta
stay = resta
stop = para
swim = nada
walk = pasea
travel = viaja
eat = come
eats = come
ate = ia come
will eat = va come
would eat = ta come
to eat = come
if i ate = si me ta come
if you ate = si tu ta come
if he ate = si el ta come
if she ate = si el ta come
if we ate = si nos ta come
if they ate = si los ta come
if you all ate = si vos ta come
drink = bevi
drinks = bevi
drank = ia bevi
will drink = va bevi
would drink = ta bevi
to drink = bevi
hear = oia
hears = oia
listen = escuta
see = vide
sees = vide
watch = vide
sleep = dormi
wake = velia
live = vive
die = mori
think = pensa
believe = crede
know = sabe
know someone = conose
learn = aprende
understand = comprende
remember = recorda
forget = oblida
decide = deside
go crazy = loci
goes crazy = loci 
say = dise
tell = dise
speak = parla
read = leje
write = scrive
ask = demanda
answer = responde
explain = esplica
translate = tradui
thank = grasia
like = gusta
love = ama
hate = odia
fear = teme
hope = espera
feel = senti
laugh = rie
cry = plora
smile = surie
prefer = prefere
to buy = compra
sell = vende
pay = paia
take = prende
give = dona
choose = eleje
find = trova
help = aida
use = usa
put = pone
bring = trae
carry = porta
lose = perde
win = gania
open = abri
close = clui
break = rompe
start = comensa
begin = comensa
finish = fini
end = fini
change = cambia
study = studia
teach = ensenia
play = jua
drive = gida
cook = coce
wash = lava
wear = porta
working = laborante

# extra common verbs from your newest pack
try = atenta | verb
create = crea | verb
build = construi | verb
repair = repara | verb
clean = limpa | verb
search = xerca | verb
show = mostra | verb
send = envia | verb
receive = reseta | verb
meet = encontra | verb
arrive = ariva | verb
wait = espeta | verb
need = nesesa | verb
look = regarda | verb
look at = regarda | verb
move = move | verb
see = vide | verb
sees = vide
saw = ia vide
will see = va vide
would see = ta vide 

# =========================================================
# BASIC CONNECTORS / LITTLE WORDS
# =========================================================
but = ma
and = e
or = o
also = ance
again = denova
already = ja
still = ancora
now = aora
today = oji
yesterday = ier
tomorrow = doman
soon = pronto
later = plu tarda
before = ante
after = pos
then = alora
always = sempre
never = nunca
sometimes = a veses
often = frecuente
yes = si
no = no
not = no
maybe = posible
probably = probable
here = asi
there = ala
here and there = asi e ala
more = plu
less = min
very = multe | adv
too = tro | adv
almost = cuasi
only = sola
just = sola
so that = afin
in order to = afin
for example = per esemplo
in any case = en cualce caso
of course = natural
thank you = grasias
please = per favore
it is = lo es
it was = lo ia es
it will be = lo va es
it would be = lo ta es
this thing = esta cosa
that thing = acel cosa
these = estas
those = aceles

# =========================================================
# NOT BE — present / past / future / going to be / conditional
# =========================================================
i am not = me no es
i was not = me no ia es
i will not be = me no va es
i am not going to be = me no va es
i would not be = me no ta es
you are not = tu no es
you were not = tu no ia es
you will not be = tu no va es
you are not going to be = tu no va es
you would not be = tu no ta es
he is not = el no es
he was not = el no ia es
he will not be = el no va es
he is not going to be = el no va es
he would not be = el no ta es
she is not = el no es
she was not = el no ia es
she will not be = el no va es
she is not going to be = el no va es
she would not be = el no ta es
it is not = lo no es
it was not = lo no ia es
it will not be = lo no va es
it is not going to be = lo no va es
it would not be = lo no ta es
we are not = nos no es
we were not = nos no ia es
we will not be = nos no va es
we are not going to be = nos no va es
we would not be = nos no ta es
they are not = los no es
they were not = los no ia es
they will not be = los no va es
they are not going to be = los no va es
they would not be = los no ta es
you all are not = vos no es
you all were not = vos no ia es
you all will not be = vos no va es
you all are not going to be = vos no va es
you all would not be = vos no ta es

# =========================================================
# COMMON ADJECTIVES
# =========================================================
good = bon | adj
bad = mal | adj
happy = felis | adj
cheerful = felis | adj
sad = triste | adj
big = grande | adj
large = grande | adj
small = peti | adj
little = peti | adj
long = longa | adj
short = corta | adj
high = alta | adj
low = basa | adj
near = prosima | adj
far = distante | adj
full = plen | adj
empty = vacua | adj
open = abrida | adj
closed = cluida | adj
heavy = pesosa | adj
light = lejera | adj
wide = larga | adj
narrow = streta | adj
straight = direta | adj
round = ronda | adj
clean = limpa | adj
dirty = bruta | adj
easy = fasil | adj
difficult = difisil | adj
hard = dur | adj
soft = mol | adj
hot = calda | adj
warm = tepida | adj
cold = fria | adj
cool = fresca | adj
wet = umida | adj
dry = seca | adj
new = nova | adj
old = vea | adj
fast = rapida | adj
slow = lenta | adj
late = tarda | adj
ready = preparada | adj
important = importante | adj
interesting = interesante | adj
correct = coreta | adj
wrong = falsa | adj
true = vera | adj
false = falsa | adj
possible = posible | adj
impossible = nonposible | adj
necessary = nesesada | adj
sure = serta | adj
beautiful = bela | adj
pretty = bela | adj
ugly = fea | adj
cheap = barata | adj
expensive = cara | adj
safe = secur | adj
dangerous = perilosa | adj
strange = strana | adj
special = spesial | adj
useful = usosa | adj
usual = usual | adj
strong = forte | adj
weak = debil | adj
healthy = sana | adj
sick = malada | adj
hungry = fama | adj
thirsty = side | adj
tired = fatigada | adj
busy = ocupada | adj
free = libre | adj
friendly = amin | adj
honest = onesta | adj
jealous = jelosa | adj
angry = coler | adj
curious = curiosa | adj
comfortable = comfortosa | adj
uncomfortable = noncomfortosa | adj
simple = simple | adj
logical = lojical | adj
clear = clar | adj
dark = scur | adj
real = real | adj
personal = personal | adj
local = local | adj
public = publica | adj
private = privada | adj
common = comun | adj
different = diferente | adj
same = mesma | adj
young = joven | adj
black = negra | adj
white = blanca | adj
red = roja | adj
blue = blu | adj
green = verde | adj
yellow = jala | adj
gray = gris | adj
brown = brun | adj
orange = orania | adj
pink = ros | adj
purple = purpur | adj
`;

// Repetitive phrase traps generated here keep vocab.js editable without a giant 3,000-line monster.
const generatedVocabLines = [];

const subjects = [
  { eng: "i", ele: "me", want: "want", wanted: "wanted", wants: "want" },
  { eng: "you", ele: "tu", want: "want", wanted: "wanted", wants: "want" },
  { eng: "he", ele: "el", want: "wants", wanted: "wanted", wants: "wants" },
  { eng: "she", ele: "el", want: "wants", wanted: "wanted", wants: "wants" },
  { eng: "we", ele: "nos", want: "want", wanted: "wanted", wants: "want" },
  { eng: "they", ele: "los", want: "want", wanted: "wanted", wants: "want" },
  { eng: "you all", ele: "vos", want: "want", wanted: "wanted", wants: "want" }
];

const objects = [
  { eng: "me", ele: "me" },
  { eng: "you", ele: "tu" },
  { eng: "him", ele: "el" },
  { eng: "her", ele: "el" },
  { eng: "us", ele: "nos" },
  { eng: "them", ele: "los" },
  { eng: "you all", ele: "vos" }
];

for (const s of subjects) {
  // want to
  generatedVocabLines.push(`${s.eng} ${s.want} to = ${s.ele} vole`);
  generatedVocabLines.push(`${s.eng} wanted to = ${s.ele} ia vole`);
  generatedVocabLines.push(`${s.eng} will want to = ${s.ele} va vole`);
  generatedVocabLines.push(`${s.eng} would want to = ${s.ele} ta vole`);
  generatedVocabLines.push(`if ${s.eng} ${s.want} to = si ${s.ele} vole`);
  generatedVocabLines.push(`if ${s.eng} wanted to = si ${s.ele} ta vole`);

  // can / could / should / must / have to
  generatedVocabLines.push(`${s.eng} can = ${s.ele} pote`);
  generatedVocabLines.push(`${s.eng} could = ${s.ele} ta pote`);
  generatedVocabLines.push(`${s.eng} should = ${s.ele} debe`);
  generatedVocabLines.push(`${s.eng} must = ${s.ele} debe`);
  generatedVocabLines.push(`${s.eng} have to = ${s.ele} debe`);
  generatedVocabLines.push(`${s.eng} has to = ${s.ele} debe`);
  generatedVocabLines.push(`${s.eng} had to = ${s.ele} ia debe`);
  generatedVocabLines.push(`${s.eng} will have to = ${s.ele} va debe`);
  generatedVocabLines.push(`${s.eng} would have to = ${s.ele} ta debe`);

  for (const o of objects) {
    // want someone to
    generatedVocabLines.push(`${s.eng} ${s.want} ${o.eng} to = ${s.ele} vole ce ${o.ele}`);
    generatedVocabLines.push(`${s.eng} wanted ${o.eng} to = ${s.ele} ia vole ce ${o.ele}`);
    generatedVocabLines.push(`${s.eng} will want ${o.eng} to = ${s.ele} va vole ce ${o.ele}`);
    generatedVocabLines.push(`if ${s.eng} ${s.want} ${o.eng} to = si ${s.ele} vole ce ${o.ele}`);
    generatedVocabLines.push(`if ${s.eng} wanted ${o.eng} to = si ${s.ele} ta vole ce ${o.ele}`);

    // help someone / help someone to
    generatedVocabLines.push(`${s.eng} help ${o.eng} = ${s.ele} aida ${o.ele}`);
    generatedVocabLines.push(`${s.eng} helps ${o.eng} = ${s.ele} aida ${o.ele}`);
    generatedVocabLines.push(`${s.eng} helped ${o.eng} = ${s.ele} ia aida ${o.ele}`);
    generatedVocabLines.push(`${s.eng} will help ${o.eng} = ${s.ele} va aida ${o.ele}`);
    generatedVocabLines.push(`${s.eng} would help ${o.eng} = ${s.ele} ta aida ${o.ele}`);
    generatedVocabLines.push(`${s.eng} help ${o.eng} to = ${s.ele} aida ${o.ele} a`);
    generatedVocabLines.push(`${s.eng} helps ${o.eng} to = ${s.ele} aida ${o.ele} a`);
    generatedVocabLines.push(`${s.eng} helped ${o.eng} to = ${s.ele} ia aida ${o.ele} a`);
    generatedVocabLines.push(`${s.eng} will help ${o.eng} to = ${s.ele} va aida ${o.ele} a`);
    generatedVocabLines.push(`${s.eng} would help ${o.eng} to = ${s.ele} ta aida ${o.ele} a`);

    // teach someone to
    generatedVocabLines.push(`${s.eng} teach ${o.eng} to = ${s.ele} ensenia ${o.ele} a`);
    generatedVocabLines.push(`${s.eng} teaches ${o.eng} to = ${s.ele} ensenia ${o.ele} a`);
    generatedVocabLines.push(`${s.eng} taught ${o.eng} to = ${s.ele} ia ensenia ${o.ele} a`);
    generatedVocabLines.push(`${s.eng} will teach ${o.eng} to = ${s.ele} va ensenia ${o.ele} a`);
  }
}

const forcedVocabOverrides = `
# =========================================================
# FORCED OVERRIDES PERM - WANT SOMEONE TO
# These stay at the very end so they win over duplicates.
# =========================================================

want me to = vole ce me
wanted me to = ia vole ce me
will want me to = va vole ce me
would want me to = ta vole ce me

want you to = vole ce tu
wanted you to = ia vole ce tu
will want you to = va vole ce tu
would want you to = ta vole ce tu

want him to = vole ce el
wanted him to = ia vole ce el
will want him to = va vole ce el
would want him to = ta vole ce el

want her to = vole ce el
wanted her to = ia vole ce el
will want her to = va vole ce el
would want her to = ta vole ce el

want it to = vole ce lo
wanted it to = ia vole ce lo
will want it to = va vole ce lo
would want it to = ta vole ce lo

want us to = vole ce nos
wanted us to = ia vole ce nos
will want us to = va vole ce nos
would want us to = ta vole ce nos

want them to = vole ce los
wanted them to = ia vole ce los
will want them to = va vole ce los
would want them to = ta vole ce los

want you all to = vole ce vos
wanted you all to = ia vole ce vos
will want you all to = va vole ce vos
would want you all to = ta vole ce vos
`;

window.DEFAULT_VOCAB_TEXT = [
  BASE_VOCAB_TEXT,
  generatedVocabLines.join("\n"),
  forcedVocabOverrides
].join("\n").trim();
