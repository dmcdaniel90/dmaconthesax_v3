import TextBlock from "@/components/TextBlock"
export default function About() {
    return (
        <main className="flex flex-col gap-8">
            <div className="bg-gray-900/60 px-32 py-12">
                <TextBlock heading="About Us" subheading="The Story Behind Our Website" imagePosition="left" image="https://images.unsplash.com/photo-1642784323419-89d08b21c4de?ixid=M3w2NjY5MzN8MHwxfHNlYXJjaHw3fHxlbGVjdHJpYyUyMGtleWJvYXJkfGVufDB8MHx8fDE3NTUwODczNTd8MA&ixlib=rb-4.1.0" imageAltText="About Us" size={500} textWidth={500} width={1300} bodySize={16} headingSize={32} subheadingSize={20} >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio ex ad quam commodi omnis nisi alias, non modi et necessitatibus rerum sapiente quas voluptatibus iste doloremque, dolor quisquam molestias! Quo?
                </TextBlock>
            </div>
            <div className="bg-gray-900/60 px-32 py-12">
                <TextBlock heading="Our Music" width={1000} bodySize={16} headingSize={32}>
                    <article>
                        <p>
                            I have been playing the piano for over 20 years and have been writing music for 10. I have a degree in Music Composition from the University of North Texas, where I studied with some of the most renowned musicians in the world. I have also had the opportunity to perform at some of the most prestigious venues in the world, including Carnegie Hall and the Sydney Opera House.
                        </p>
                        <br />
                        <p>
                            I have also been fortunate enough to have had my music performed by some of the most talented musicians in the world, including the New York Philharmonic and the Los Angeles Philharmonic. My music is a reflection of my experiences and the world around me. I believe that music has the power to bring people together and to create positive change in the world. I am dedicated to using my music to make a difference in the lives of others.
                        </p>
                    </article>
                </TextBlock>
            </div>
        </main>
    )
}
