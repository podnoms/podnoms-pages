import { GetServerSideProps } from "next";
import React from "react";
import { Podcast } from "../../models";
import Image from "next/image";
interface IPodcastPageProps {
  podcast: Podcast;
}
const PodcastPage = ({ podcast }: IPodcastPageProps) => {
  return (
    <>
      <div>{podcast.title}</div>
      <div>{podcast.description}</div>
      {podcast.coverImageUrl && (
        <Image src={podcast.coverImageUrl} alt="cover" />
      )}

      <p>
        Food truck ipsum molestie pharetra a craft beer tempus sem gravida amet
        fixie porttitor enim at odio mustache. Ligula amet nulla gravida bahn mi
        congue sapien leo sapien bahn mi non nam mauris sagittis wire-rimmed
        glasses gravida porta eget sapien. Wire-rimmed glasses quam et elementum
        nam brunch ligula nibh cursus congue tofu at ultricies gravida nulla
        vim. Rutrum porttitor eget quam VHS enim lorem magna sapien laserdisc
        nulla mauris pellentesque morbi craft beer at duis ut diam. Biodiesel
        massa ipsum mattis vulputate DIY maecenas elementum odio nec artisan
        vivamus mattis mattis ornare DIY tellus cursus auctor vitae. Bahn mi
        donec cursus porttitor molestie beard sodales tempus vitae porttitor you
        probably haven&apos;t heard of them eu curabitur sem risus. Skateboard cursus
        nam auctor tellus tattoo orci risus gravida congue wire-rimmed glasses
        lorem donec nibh justo. Austin odio at tempus ut vegan curabitur eu
        sodales adipiscing mustache tellus gravida nibh vitae beard vivamus.
        Curabitur sit urna keytar vulputate curabitur porta et keytar quam et
        proin eget DIY nulla. Leo morbi risus specs nulla quisque ut vivamus
        foodie sagittis donec sit ligula noise-rock justo sit. Eu rutrum fixie
        morbi enim enim metus Brooklyn risus in sem diam +1 a quam mauris ornare
        skateboard. Cursus magna arcu commodo keytar odio eu donec adipiscing
        Austin amet tempus ipsum fusce craft beer. Ipsum non sed fusce
        farm-to-table porttitor mauris cursus curabitur vinyl mattis ornare quam
        tempus VHS curabitur non lorem lorem 8-bit. Justo sodales pharetra porta
        Brooklyn adipiscing magna porta et viral sapien commodo lorem duis beard
        sed sapien sem lectus farm-to-table. Et fusce tellus fusce vegan
        vulputate mauris malesuada lectus DIY ornare ipsum nam quisque laserdisc
        congue ut eu sapien. Bicycle porta elementum vulputate cursus specs
        vulputate ligula justo bibendum wire-rimmed glasses curabitur congue
        morbi massa undefined sem risus. Quam mattis keytar odio tellus mattis
        quisque specs a justo massa odio artisan cursus proin fusce arcu. VHS
        donec nam arcu lorem specs vitae ipsum nec sodales PBR lectus odio
        tellus pellentesque. Biodiesel vitae vulputate nam duis farm-to-table
        porttitor in quam eu DIY ligula arcu nibh a laserdisc magna sodales.
        Enim enim vim quisque nec sed orci foodie eu cursus justo arcu
        farm-to-table urna auctor eros. Et keytar ut sem cursus diam VHS diam
        porta duis ligula Portland tellus eget et sagittis. VHS tempus lorem
        cursus tellus food truck ultricies duis nam curabitur PBR congue non
        nibh ultricies viral proin nibh. Magna undefined foodie undefined odio
        risus donec food truck maecenas vulputate sem mauris farm-to-table
        mattis ligula a. undefined skateboard a gravida arcu eros 8-bit ligula
        ut porta massa cred congue amet elementum. Urna organic sodales tellus
        undefined molestie specs commodo proin ornare elementum fixie nam
        elementum odio quam.
      </p>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("[podcast]", "getServerSideProps", context.params);
  const res = await fetch(
    `${process.env.API_URL}/podcast/${context.params?.user}/${context.params?.podcast}/featured`
  );
  const podcast: Podcast = await res.json();

  return {
    props: {
      podcast,
    },
  };
};
export default PodcastPage;
