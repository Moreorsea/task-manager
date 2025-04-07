<template>
  <section class="statistic container">
        <div class="statistic__line">
          <div class="statistic__period">
            <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

            <div class="statistic-input-wrap">
              <input
                class="statistic__period-input"
                type="text"
                placeholder="01 Feb - 08 Feb"
              />
            </div>

            <p class="statistic__period-result">
              In total for the specified period
              <span class="statistic__task-found">0</span> tasks were fulfilled.
            </p>
          </div>
          <div class="statistic__line-graphic visually-hidden">
            <canvas
              class="statistic__days"
              width="550"
              height="150"
              style="width: 550px; height: 150px"
            ></canvas>
          </div>
        </div>

        <div class="statistic__circle">
          <div class="statistic__colors-wrap visually-hidden">
            <canvas
              class="statistic__colors"
              width="400"
              height="300"
              style="width: 400px; height: 300px"
            ></canvas>
          </div>
        </div>
      </section>
</template>

<style lang="less">
.statistic {
  padding-top: 50px;
  padding-bottom: 50px;
}
.statistic__line {
  display: flex;
  padding-bottom: 20px;
  border-bottom: 5px solid #000000;
}
.statistic__period {
  width: 230px;
  margin-right: 80px;
}
.statistic__period-title {
  margin-top: 0;
  font-size: 18px;
  text-transform: uppercase;
}
.statistic-input-wrap {
  display: flex;
  width: 100%;
}
.statistic__period-input {
  padding: 8px 0 4px 20px;
  margin: 0;
  border: 1px solid #000000;
  font-size: 14px;
  width: 100%;
  color: #000000;
}
.statistic__period-result {
  font-size: 14px;
  font-weight: 500;
}
.statistic__circle {
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
