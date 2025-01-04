<template>
  <div class="flex flex-col items-center gap-4 pt-20">
    <base-banner :title="'Về chúng tôi'"></base-banner>

    <section class="w-full max-w-screen-lg flex flex-col gap-16 mx-4 mt-10 px-4">
      <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
        <img
          src="https://givewellvnbucket.s3.ap-southeast-2.amazonaws.com/slider/slide-5.jpg"
          class="object-cover rounded-lg w-full"
        />
        <div class="h-full gap-2 flex flex-col">
          <span class="text-pink-500 font-bold text-2xl">Định hướng</span>
          <article class="flex-1 md:line-clamp-6 lg:line-clamp-none text-gray-500">
            DNXH Vietnam Children's Fund khuyến khích các đối tác đầu tư hỗ trợ những đối tượng có
            hoàn cảnh khó khăn thông qua: Giải pháp bền vững về y tế, sức khỏe cộng đồng Cơ hội tiếp
            cận giáo dục cho các nữ sinh dân tộc thiểu số Sáng kiến bảo vệ môi trường, tiết kiệm
            năng lượng thiết thực Những hoạt động này nhằm góp phần cải thiện cuộc sống của trẻ em,
            phụ nữ và các cộng đồng khó khăn tại Việt Nam.
          </article>
        </div>
      </div>
      <div class="gap-4 grid grid-cols-1 md:grid-cols-2">
        <img
          src="https://givewellvnbucket.s3.ap-southeast-2.amazonaws.com/slider/slide-4.jpg"
          class="object-cover rounded-lg w-full md:order-2"
        />
        <div class="h-full max-h-80 gap-2 flex flex-col">
          <span class="text-pink-500 font-bold text-2xl">Tầm nhìn</span>
          <p class="flex-1 md:line-clamp-6 lg:line-clamp-none text text-gray-500">
            DNXH Vietnam Children’s Fund nỗ lực phát triển trở thành doanh nghiệp xã hội hàng đầu
            tại Việt Nam, cung cấp cho khách hàng và đối tác nhiều cơ hội đầu tư đa dạng vào các
            giải pháp bền vững về y tế, sức khỏe cộng đồng, môi trường và giáo dục để giải quyết các
            thách thức xã hội. Với việc nâng cao chất lượng cuộc sống và sinh kế cho người dân, DNXH
            Vietnam Children’s Fund cùng các đối tác thực hiện công tác trách nhiệm xã hội của doanh
            nghiệp một cách thiết thực, hiệu quả và có tầm ảnh hưởng nhất.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-pink-500 w-full h-[30vh] md:h-[40vh] relative overflow-hidden mt-10">
      <div class="absolute inset-0 transition-all duration-700 ease-in-out">
        <img
          src="https://givewellvnbucket.s3.ap-southeast-2.amazonaws.com/slider/slider-2.jpg"
          class="object-cover w-full h-full absolute inset-0 transition-transform duration-700 ease-in-out transform hover:scale-105"
        />
        <div
          class="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-black/40 flex flex-col gap-8 items-center justify-end transition-all duration-700 ease-in-out"
        >
          <div
            class="max-w-lg text-white text-start h-full flex flex-col justify-center transform transition-transform duration-500 ease-out gap-4"
          >
            <p class="text-pink-600 text-4xl font-bold text-center">Báo cáo</p>
            <p class="text-white text-center text-sm transition-all duration-700 ease-in-out">
              Givewellvn cam kết minh bạch toàn bộ số liệu và kết quả đạt được sau mỗi dự án.
              <br />
              Hãy chung tay cùng chúng tôi để hỗ trợ cho cộng đồng yếu thế trong xã hội bằng những
              chương trình giáo dục và y tế thiết thực.
            </p>

            <div class="flex justify-center text-2xl flex-col items-center">
              <p class="font-bold">Báo cáo thường niên</p>
              <div class="flex gap-8">
                <p>2024</p>
                <p>2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import BaseBanner from '@/components/BaseBanner.vue'
</script>

<style>
</style>
