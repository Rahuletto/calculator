<script setup>
import Btn from "./button.vue";
</script>

<script>

export default {
  data() {
    return {
      data: "",
      result: "",
      equal: false,
      rad: true,
    };
  },
  methods: {
    enter(no, symbol = false) {
      this.equal = true;
      this.data = this.data.toString() + (symbol ? " " : "") + no.toString();
      try {
        if (this.data != "") this.result = math(this.data, this.$math, this.rad);
        else this.result = "";
      } catch (err) {
        this.result = err;
      }
    },
    clear() {
      this.equal = true;
      this.data = "";
      this.result = "";
    },
    back() {
      this.equal = true;
      this.data = this.data.slice(0, -1);
      try {
        if (this.data != "") this.result = math(this.data, this.$math, this.rad);
        else this.result = "";
      } catch (err) {
        this.result = err;
      }
    },
    eval() {
      this.equal = !this.equal;

      try {
        if (this.data != "") this.result = math(this.data, this.$math, this.rad);
        else this.result = "";
      } catch (err) {
        this.result = err;
      }
    },
    deg() {
      this.rad = false;
      if (this.data != "") this.result = math(this.data, this.$math, this.rad);
      else this.result = "";
    },
    radian() {
      this.rad = true;
      if (this.data != "") this.result = math(this.data, this.$math, true);
      else this.result = "";
    },
  },
};

function math(data, mathy, rad = true) {


  let input = data;
  input = input
    .replaceAll("^", "**")
    .replaceAll("%", "/100")
    .replaceAll("cos⁻¹(", "acos(")
    .replaceAll("sin⁻¹(", "asin(")
    .replaceAll("tan⁻¹(", "atan(")
    .replaceAll("³√(", "cbrt(")
    .replaceAll("log(", "log10(")
    .replaceAll("ln(", "log(")
    .replace(")(", ")*(")
    .replaceAll("°", "")
    .replaceAll('>>', 'in')
    .replaceAll('>', 'to')
    .replaceAll('π', 'pi')

if(input.includes('√')){
  let nr = input.split("√");
  let l = nr.length;
  nr = input.split("√")[0].substring(0, l);

  input = input.replaceAll(`${nr}√(`, ``).replaceAll(')', '');
  
  input = mathy.nthRoot(input, nr).toString()
  
}
  if (input.includes("!")) {
    let spl = input.split("!")
    let n = Number(spl[0].substring(0, spl.length));
    let f = 1;

    for (let i = 2; i <= n; i++) f = f * i;
    input = input.replaceAll(n + "!", f);
  }


  if (
    (!rad && input.includes("sin")) ||
    (!rad && input.includes("cos")) ||
    (!rad && input.includes("tan"))
  ) {
    return (
      (
        mathy.evaluate(input) *
        (180 / Math.PI)
      ).toString() + "°"
    );
  } else return mathy.evaluate(input);
}
</script>

<template>
  <header>
    <grid>
      <div>
        <Btn @click="enter('sin(', true)" name="sin" type="symbol" />
        <Btn @click="enter('cos(', true)" name="cos" type="symbol" />
        <Btn @click="enter('tan(', true)" name="tan" type="symbol" />
        <Btn @click="enter('sin⁻¹(', true)" name="sin⁻¹" type="symbol" />
        <Btn @click="enter('cos⁻¹(', true)" name="cos⁻¹" type="symbol" />
        <Btn @click="enter('tan⁻¹(', true)" name="tan⁻¹" type="symbol" />
      <!-- <Btn @click="enter('∫(', false)" name="∫ dx" type="symbol" /> !-->
        <Btn @click="enter('³√(', true)" name="3√" type="symbol" />
        <Btn @click="enter('e', true)" name="e" type="symbol" />
        <Btn @click="enter('!', false)" name="𝑥!" type="symbol" />
        <Btn @click="enter('π', false)" name="π" type="symbol" />
        <Btn @click="enter(' mod ', false)" name="mod" type="symbol" />
      </div>
      <div class="convo">
        <Btn @click="enter(' inch > cm', false)" name="in ❯ cm" type="symbol" />
        <Btn @click="enter(' cm > inch', false)" name="cm ❯ in" type="symbol" />
          <Btn @click="enter(' inch > yards', false)" name="in ❯ yard" type="symbol" />
        <Btn @click="enter(' km/h > m/s', false)" name="km/h ❯ m/s" type="symbol" />
        <Btn @click="enter(' m/s > km/h', false)" name="m/s ❯ km/h" type="symbol" />
        <Btn @click="enter(' km > mile', false)" name="km ❯ mile" type="symbol" />
        <Btn @click="enter(' mile > km', false)" name="mile ❯ km" type="symbol" />
        <Btn @click="enter(' celsius >> fahrenheit', false)" name="C° ❯ F°" type="symbol" />
        <Btn @click="enter(' fahrenheit >> celsius', false)" name="F° ❯ C°" type="symbol" />
          <Btn @click="enter(' celsius >> kelvin', false)" name="C° ❯ K" type="symbol" />
        <Btn @click="enter(' fahrenheit >> kelvin', false)" name="F° ❯ K" type="symbol" />
      </div>

      <holder>
        <display>
          <span v-if="equal" class="data">{{ data }}</span>
          <span v-else class="data-eq">{{ data }}</span>
          <span v-if="equal" class="result">{{ result }}</span>
          <span v-else class="equaled">{{ result }}</span>
        </display>
        <grido>
          <Btn @click="enter('log(')" name="log" />
          <Btn @click="enter('ln(')" name="ln" />
          <Btn :class="{ activy: !rad }" @click="deg()" name="DEG" />
          <Btn :class="{ activy: rad }" @click="radian()" name="RAD" />
          <Btn @click="enter('(')" name="(" />
          <Btn @click="enter(')')" name=")" />
          <Btn @click="enter('^')" name="^" />
          <Btn @click="enter('√(')" name="√" />
          <Btn @click="clear()" class="symbol" name="AC" />
          <Btn @click="back()" class="symbol" name="DEL" />
          <Btn @click="enter('%')" class="symbol" name="%" />
          <Btn @click="enter('/')" class="symbol" name="/" />
          <Btn @click="enter('7')" name="7" />
          <Btn @click="enter('8')" name="8" />
          <Btn @click="enter('9')" name="9" />
          <Btn @click="enter('*')" class="symbol" name="x" />
          <Btn @click="enter('4')" name="4" />
          <Btn @click="enter('5')" name="5" />
          <Btn @click="enter('6')" name="6" />
          <Btn @click="enter('-')" class="symbol" name="-" />
          <Btn @click="enter('1')" name="1" />
          <Btn @click="enter('2')" name="2" />
          <Btn @click="enter('3')" name="3" />
          <Btn @click="enter('+')" class="symbol" name="+" />
          <Btn @click="enter('00')" name="00" />
          <Btn @click="enter('0')" name="0" />
          <Btn @click="enter('.')" name="." />
          <Btn @click="eval()" class="equal" name="=" />
        </grido>
      </holder>
    </grid>
  </header>
</template>

<style scoped>
.activy {
  background: #0b780b41;
  color: lightgrey;
  border: 2px solid #0b780bab;
}

.data {
  color: lightgrey;
  font-size: 24px;
  padding: 0px;
}

.data-eq {
  color: rgba(211, 211, 211, 0.603);
  padding: 0;
}
.equaled {
  color: lightgrey;
  font-size: 28px;
  padding: 0px;
  user-select: text;
}
.result {
  color: rgba(211, 211, 211, 0.603);
  padding: 0px;
  user-select: text;
}

.symbol {
  height: 45px;
  background-color: #7a00ffba;
  color: lightgrey;
  border: 2px solid #7a00ffba;
}

.equal {
  height: 45px;
  background: #0b780bf2;
  color: lightgrey;
  border: 2px solid #0b780bf2;
}

grido {
  display: grid;
  grid-gap: 10px;
  grid-auto-flow: row;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
}

grid {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
  margin: 15px;
  background-color: #04040436;
  border-radius: 10px;
  grid-gap: 10px;
  padding: 15px;
}

display {
  background-color: #040404;
  border-radius: 11px;
  display: flex;
  color: #c7c7c7;
  font-size: 22px;
  height: 90px;
  padding: 6px 14px;
  overflow: auto;
  margin: 5px;
  flex-direction: column;
}

grid div {
  display: flex;
  gap: 10px;
  width: auto;
  flex-direction: column;
}

grid div.convo button {
  font-size: 16px;
  line-height: 1;
  width: 85px;
  
}

holder {
  left: 35%;
  top: 11%;
  position: fixed;
  width: 33%;
  max-width: 375px;
  min-width: 365px;
  border-radius: 14px;
  background: #0a0a0a;
  height: 78vh;
  padding: 10px;
  box-shadow: 0px 0px 25px #000000;
}
</style>
