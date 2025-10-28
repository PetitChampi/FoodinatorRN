import { Meal } from "@/models/types";
import { avocadoToast } from "./avocado-toast";
import { boeufBourguignon } from "./boeuf-bourguignon";
import { burgers } from "./burgers";
import { honeyGarlicChickenSkewers } from "./honey-garlic-chicken-skewers";
import { chickpeaChardPork } from "./chickpea-chard-pork";
import { creamyChicBroc } from "./creamy-chic-broc";
import { epicBeansAndSteak } from "./epic-beans-and-steak";
import { fishNMash } from "./fish-n-mash";
import { fishyPasta } from "./fishy-pasta";
import { panSearedLamb } from "./lamb-and-potatoes";
import { luxuryJambonBeurre } from "./luxury-jambon-beurre";
import { mexicanStyleBeanCasserole } from "./mexican-style-bean-casserole";
import { mushroomRisotto } from "./mushroom-risotto";
import { pastaBolognese } from "./pasta-bolognese";
import { pastaCarbonara } from "./pasta-carbonara";
import { pestoChickenGnocchi } from "./pesto-chicken-gnocchi";
import { pistacchioGnocchi } from "./pistachio-pesto-gnocchi";
import { prawnBurritos } from "./prawn-burritos";
import { prosciuttoMozzaFocaccia } from "./prosciutto-mozza-foccacia";
import { salmonBagels } from "./salmon-bagels";
import { salmonPokePlate } from "./salmon-poke-plate";
import { saotoPouleAuPot } from "./saoto-poule-au-pot";
import { seafoodRisotto } from "./seafood-risotto";
import { tomMozzaBruschetta } from "./tom-mozza-bruschetta";
import { tunaGnocchi } from "./tuna-gnocchi";
import { tunaPita } from "./tuna-pita";

export const meals: Meal[] = [
  avocadoToast,
  boeufBourguignon,
  burgers,
  honeyGarlicChickenSkewers,
  chickpeaChardPork,
  creamyChicBroc,
  epicBeansAndSteak,
  fishNMash,
  fishyPasta,
  panSearedLamb,
  luxuryJambonBeurre,
  mexicanStyleBeanCasserole,
  mushroomRisotto,
  pastaBolognese,
  pastaCarbonara,
  pestoChickenGnocchi,
  pistacchioGnocchi,
  prawnBurritos,
  prosciuttoMozzaFocaccia,
  salmonBagels,
  salmonPokePlate,
  saotoPouleAuPot,
  seafoodRisotto,
  tomMozzaBruschetta,
  tunaGnocchi,
  tunaPita,
];

export const getMealById = (id: string): Meal | null => {
  return meals.find(meal => meal.id === id) || null;
};
