<template>
    <div class='banner'>
        <mu-carousel>
            <mu-carousel-item>
                <img :src="carouselImg2">
            </mu-carousel-item>
            <mu-carousel-item>
                <img :src="carouselImg3">
            </mu-carousel-item>
            <mu-carousel-item>
                <img :src="carouselImg4">
            </mu-carousel-item>
        </mu-carousel>
    </div>

</template>

<script>
import carouselImg2 from "../assets/images/carousel2.jpg";
import carouselImg3 from "../assets/images/carousel3.jpg";
import carouselImg4 from "../assets/images/carousel4.jpg";

export default {
  data() {
    return {
      carouselImg2,
      carouselImg3,
      carouselImg4
    };
  }
};
</script>
<style scoped>
.banner img {
  width: 3.552rem;
  height: 3rem;
}

.banner .mu-carousel {
  width: 3.552rem;
  height: 3rem;
}
</style>